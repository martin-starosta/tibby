import { JOURNALIST } from '@/content/events'
import { isExposed, shouldCheckpoint } from '@/game/checkpoint'
import { isFinale } from '@/game/finale'
import { applyEventIncoming } from '@/game/events'
import { modifiedBribeMoney, modifiedCaseRiskGain } from '@/game/investments'

export type ResourceDelta = {
  money: number
  risk: number
}

export type CaseFact = {
  text: string
  sourceName: string
  sourceUrl: string
}

export type CaseCard = {
  id: string
  act: number
  title: string
  prompt: string
  accept: ResourceDelta
  refuse: ResourceDelta
  fact: CaseFact
}

export type RunState = {
  schema: 1
  caseIndex: number
  money: number
  risk: number
  ownedInvestmentIds: string[]
  pendingDelayedRisk: number
  pendingEventId: string | null
  seenEventIds: string[]
  acceptedCount: number
  refusedCount: number
  quickCoverUsesThisAct: number
  peakRisk: number
  rngSeed: number
  status: 'playing' | 'checkpoint' | 'exposed' | 'finale'
  resolvedCaseIds: string[]
}

export type Decision = {
  type: 'accept' | 'refuse'
  card: CaseCard
}

export const EVENT_EVERY = 3

export function createInitialRun(rngSeed = 1): RunState {
  return {
    schema: 1,
    caseIndex: 1,
    money: 0,
    risk: 0,
    ownedInvestmentIds: [],
    pendingDelayedRisk: 0,
    pendingEventId: null,
    seenEventIds: [],
    acceptedCount: 0,
    refusedCount: 0,
    quickCoverUsesThisAct: 0,
    peakRisk: 0,
    rngSeed,
    status: 'playing',
    resolvedCaseIds: [],
  }
}

function floor0(value: number) {
  return value < 0 ? 0 : value
}

export function applyDecision(state: RunState, decision: Decision): RunState {
  if (state.pendingEventId) {
    return state
  }
  const delayed = state.pendingDelayedRisk
  const raw = decision.type === 'accept' ? decision.card.accept : decision.card.refuse
  const money = floor0(state.money + modifiedBribeMoney(raw.money, state))
  const risk = floor0(state.risk + delayed + modifiedCaseRiskGain(raw.risk, state))
  const next: RunState = {
    ...state,
    money,
    risk,
    peakRisk: Math.max(state.peakRisk, risk),
    pendingDelayedRisk: 0,
    acceptedCount: state.acceptedCount + (decision.type === 'accept' ? 1 : 0),
    refusedCount: state.refusedCount + (decision.type === 'refuse' ? 1 : 0),
    caseIndex: state.caseIndex + 1,
    resolvedCaseIds: [...state.resolvedCaseIds, decision.card.id],
  }
  const resolved = next.caseIndex - 1
  if (isFinale(resolved)) {
    return { ...next, status: 'finale' }
  }
  if (shouldCheckpoint(resolved)) {
    return { ...next, status: isExposed(risk) ? 'exposed' : 'checkpoint' }
  }
  if (resolved > 0 && resolved % EVENT_EVERY === 0) {
    return applyEventIncoming(next, JOURNALIST)
  }
  return next
}
