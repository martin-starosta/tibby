import type { RunState } from '@/game/reducer'

export function shouldCheckpoint(resolvedCaseIndex: number) {
  return resolvedCaseIndex === 10 || resolvedCaseIndex === 20
}

export function isExposed(risk: number) {
  return risk > 100
}

export function dismissCheckpoint(state: RunState): RunState {
  if (state.status !== 'checkpoint') {
    return state
  }
  return { ...state, status: 'playing' }
}
