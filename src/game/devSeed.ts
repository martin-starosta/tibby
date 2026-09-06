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
