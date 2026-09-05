import type { RunState } from '@/game/reducer'
import type { EventOption, GameEvent } from '@/content/events'

function floor0(value: number) {
  return value < 0 ? 0 : value
}

export function incomingAfterModifiers(event: GameEvent, _state: RunState) {
  return event.incomingRisk
}

export function applyEventIncoming(state: RunState, event: GameEvent): RunState {
  const incoming = incomingAfterModifiers(event, state)
  const risk = floor0(state.risk + incoming)
  return {
    ...state,
    risk,
    peakRisk: Math.max(state.peakRisk, risk),
    pendingEventId: event.id,
  }
}

export function projectedRisk(currentRisk: number, event: GameEvent, optionId: string) {
  const option = event.options.find((item) => item.id === optionId)
  if (!option) {
    return currentRisk
  }
  const afterIncoming = floor0(currentRisk + event.incomingRisk)
  return floor0(afterIncoming + option.riskDelta)
}

export function resolveEventOption(
  state: RunState,
  event: GameEvent,
  optionId: string,
): RunState {
  const option: EventOption | undefined = event.options.find((item) => item.id === optionId)
  if (!option || option.cost > state.money) {
    return state
  }
  const risk = floor0(state.risk + option.riskDelta)
  return {
    ...state,
    money: state.money - option.cost,
    risk,
    peakRisk: Math.max(state.peakRisk, risk),
    pendingDelayedRisk: state.pendingDelayedRisk + option.delayedRiskDelta,
    pendingEventId: null,
    seenEventIds: [...state.seenEventIds, event.id],
  }
}
