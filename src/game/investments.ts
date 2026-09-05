import { INVESTMENTS } from '@/content/investments'
import type { RunState } from '@/game/reducer'

function owned(state: RunState) {
  return INVESTMENTS.filter((item) => state.ownedInvestmentIds.includes(item.id))
}

function tagMatches(filter: string[], eventTags: string[]) {
  return filter.includes('*') || filter.some((tag) => eventTags.includes(tag))
}

export function buyInvestment(state: RunState, investmentId: string): RunState {
  const item = INVESTMENTS.find((row) => row.id === investmentId)
  if (!item || item.cost > state.money || state.ownedInvestmentIds.includes(item.id)) {
    return state
  }
  return {
    ...state,
    money: state.money - item.cost,
    ownedInvestmentIds: [...state.ownedInvestmentIds, item.id],
  }
}

export function modifiedBribeMoney(base: number, state: RunState) {
  if (base <= 0) {
    return base
  }
  let factor = 1
  for (const item of owned(state)) {
    for (const modifier of item.modifiers) {
      if (modifier.when === 'bribeMoney') {
        factor *= modifier.moneyFactor
      }
    }
  }
  return Math.floor(base * factor)
}

export function modifiedCaseRiskGain(delta: number, state: RunState) {
  if (delta <= 0) {
    return delta
  }
  let next = delta
  for (const item of owned(state)) {
    for (const modifier of item.modifiers) {
      if (modifier.when === 'caseRiskGain') {
        next += modifier.riskDelta
      }
    }
  }
  return next
}

export function modifiedEventIncoming(incoming: number, eventTags: string[], state: RunState) {
  let next = incoming
  for (const item of owned(state)) {
    for (const modifier of item.modifiers) {
      if (modifier.when === 'eventIncoming' && tagMatches(modifier.tags, eventTags)) {
        next += modifier.riskDelta
      }
    }
  }
  return next
}
