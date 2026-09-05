export type QuickCoverOption = {
  id: string
  name: string
  cost: number
  riskDelta: number
  delayedRiskDelta: number
}

export const QUICK_COVER: QuickCoverOption[] = [
  {
    id: 'cover_political',
    name: 'Politické krytie',
    cost: 50000,
    riskDelta: -30,
    delayedRiskDelta: 0,
  },
  {
    id: 'intimidate_press',
    name: 'Zastrašenie novinárov',
    cost: 30000,
    riskDelta: -20,
    delayedRiskDelta: 10,
  },
  {
    id: 'bribe_prosecutor',
    name: 'Úplatok prokurátorovi',
    cost: 100000,
    riskDelta: -50,
    delayedRiskDelta: 0,
  },
  {
    id: 'fake_alibi',
    name: 'Falošné alibi',
    cost: 20000,
    riskDelta: -15,
    delayedRiskDelta: 0,
  },
  {
    id: 'destroy_evidence',
    name: 'Zničenie dôkazov',
    cost: 40000,
    riskDelta: -25,
    delayedRiskDelta: 0,
  },
]
