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
}

export type Decision = {
  type: 'accept' | 'refuse'
  card: CaseCard
}

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
  }
}

function floor0(value: number) {
  return value < 0 ? 0 : value
}

export function applyDecision(state: RunState, decision: Decision): RunState {
  const delayed = state.pendingDelayedRisk
  const delta = decision.type === 'accept' ? decision.card.accept : decision.card.refuse
  const money = floor0(state.money + delta.money)
  const risk = floor0(state.risk + delayed + delta.risk)
  return {
    ...state,
    money,
    risk,
    peakRisk: Math.max(state.peakRisk, risk),
    pendingDelayedRisk: 0,
    acceptedCount: state.acceptedCount + (decision.type === 'accept' ? 1 : 0),
    refusedCount: state.refusedCount + (decision.type === 'refuse' ? 1 : 0),
    caseIndex: state.caseIndex + 1,
  }
}
