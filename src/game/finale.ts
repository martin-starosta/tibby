import type { CaseCard, RunState } from '@/game/reducer'

export function isFinale(resolvedCaseIndex: number) {
  return resolvedCaseIndex === 30
}

export function isFinaleWin(risk: number) {
  return risk < 50
}

export function recapMoney(state: RunState) {
  return isFinaleWin(state.risk) ? state.money : 0
}

export function finaleSources(state: RunState, cases: CaseCard[]) {
  const urls = state.resolvedCaseIds
    .map((id) => cases.find((card) => card.id === id)?.fact.sourceUrl)
    .filter((url): url is string => Boolean(url))
  return [...new Set(urls)]
}
