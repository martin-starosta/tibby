import { isExposed } from '@/game/checkpoint'
import { createInitialRun, type RunState } from '@/game/reducer'

export function seedCheckpoint(risk: number, resolvedCase = 10): RunState {
  return {
    ...createInitialRun(),
    caseIndex: resolvedCase + 1,
    risk,
    peakRisk: Math.max(0, risk),
    status: isExposed(risk) ? 'exposed' : 'checkpoint',
  }
}

export function seedFinale(risk: number): RunState {
  return {
    ...createInitialRun(),
    caseIndex: 31,
    risk,
    peakRisk: Math.max(0, risk),
    money: 80000,
    status: 'finale',
    acceptedCount: 1,
    refusedCount: 29,
    ownedInvestmentIds: ['inv_security'],
    resolvedCaseIds: ['case_bodor'],
  }
}
