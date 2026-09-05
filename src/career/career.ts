import type { RunState } from '@/game/reducer'
import { isFinaleWin } from '@/game/finale'

export type BestWin = {
  risk: number
  money: number
}

export type CareerState = {
  schema: 1
  xp: number
  level: number
  totalEarned: number
  bribesAccepted: number
  casesRefused: number
  auditsSurvived: number
  longestStreak: number
  riskSum: number
  riskSamples: number
  acceptedOnce: boolean
  survivedOnce: boolean
  wonOnce: boolean
  bestWins: BestWin[]
}

export function createInitialCareer(): CareerState {
  return {
    schema: 1,
    xp: 0,
    level: 1,
    totalEarned: 0,
    bribesAccepted: 0,
    casesRefused: 0,
    auditsSurvived: 0,
    longestStreak: 0,
    riskSum: 0,
    riskSamples: 0,
    acceptedOnce: false,
    survivedOnce: false,
    wonOnce: false,
    bestWins: [],
  }
}

export function xpToNext(level: number) {
  return 100 * level
}

function grantXp(career: CareerState, gain: number): CareerState {
  let { xp, level } = career
  xp += gain
  while (xp >= xpToNext(level)) {
    xp -= xpToNext(level)
    level += 1
  }
  return { ...career, xp, level }
}

export function insertBestWin(career: CareerState, risk: number, money: number): CareerState {
  const bestWins = [...career.bestWins, { risk, money }].sort((a, b) => a.risk - b.risk || b.money - a.money)
  return { ...career, bestWins: bestWins.slice(0, 10) }
}

export function applyCareerProgress(
  career: CareerState,
  previous: RunState,
  next: RunState,
): CareerState {
  if (next === previous || next.caseIndex === previous.caseIndex) {
    return career
  }
  const accepted = next.acceptedCount > previous.acceptedCount
  let updated = grantXp(career, accepted ? 15 : 10)
  const gained = Math.max(0, next.money - previous.money)
  const streak = next.acceptedCount + next.refusedCount
  updated = {
    ...updated,
    totalEarned: updated.totalEarned + gained,
    bribesAccepted: updated.bribesAccepted + (accepted ? 1 : 0),
    casesRefused: updated.casesRefused + (accepted ? 0 : 1),
    longestStreak: Math.max(updated.longestStreak, streak),
    riskSum: updated.riskSum + next.risk,
    riskSamples: updated.riskSamples + 1,
    acceptedOnce: updated.acceptedOnce || accepted,
  }
  if (next.status === 'checkpoint') {
    updated = grantXp({ ...updated, auditsSurvived: updated.auditsSurvived + 1, survivedOnce: true }, 25)
  }
  if (next.status === 'finale') {
    if (isFinaleWin(next.risk)) {
      updated = insertBestWin(grantXp({ ...updated, wonOnce: true }, 50), next.risk, next.money)
    } else {
      updated = grantXp(updated, 5)
    }
  }
  return updated
}

export function averageRisk(career: CareerState) {
  if (career.riskSamples === 0) {
    return 0
  }
  return career.riskSum / career.riskSamples
}
