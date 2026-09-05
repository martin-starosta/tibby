import { QUICK_COVER } from '@/content/quickCover'
import type { RunState } from '@/game/reducer'

function floor0(value: number) {
  return value < 0 ? 0 : value
}

export function applyQuickCover(state: RunState, coverId: string): RunState {
  const cover = QUICK_COVER.find((row) => row.id === coverId)
  if (!cover || cover.cost > state.money) {
    return state
  }
  const risk = floor0(state.risk + cover.riskDelta)
  return {
    ...state,
    money: state.money - cover.cost,
    risk,
    pendingDelayedRisk: state.pendingDelayedRisk + cover.delayedRiskDelta,
    quickCoverUsesThisAct: state.quickCoverUsesThisAct + 1,
  }
}
