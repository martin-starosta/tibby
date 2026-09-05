import {
  applyDecision,
  createInitialRun,
  type CaseCard,
} from '@/game/reducer'
import { dismissCheckpoint, isExposed, shouldCheckpoint } from '@/game/checkpoint'

const card: CaseCard = {
  id: 'case_x',
  act: 1,
  title: 'x',
  prompt: 'x',
  accept: { money: 0, risk: 20 },
  refuse: { money: 0, risk: 0 },
  fact: { text: 't', sourceName: 'N', sourceUrl: 'https://example.com' },
}

describe('shouldCheckpoint', () => {
  it('is true only after cases 10 and 20', () => {
    expect(shouldCheckpoint(9)).toBe(false)
    expect(shouldCheckpoint(10)).toBe(true)
    expect(shouldCheckpoint(11)).toBe(false)
    expect(shouldCheckpoint(20)).toBe(true)
    expect(shouldCheckpoint(30)).toBe(false)
  })
})

describe('isExposed', () => {
  it('is true only when risk is above 100', () => {
    expect(isExposed(100)).toBe(false)
    expect(isExposed(101)).toBe(true)
  })
})

describe('checkpoint transitions', () => {
  it('survives risk 100 after case 10 and exposes at 101', () => {
    const survive = applyDecision(
      { ...createInitialRun(), caseIndex: 10, risk: 80 },
      { type: 'accept', card },
    )
    expect(survive.risk).toBe(100)
    expect(survive.status).toBe('checkpoint')
    expect(survive.caseIndex).toBe(11)

    const dead = applyDecision(
      { ...createInitialRun(), caseIndex: 10, risk: 81 },
      { type: 'accept', card },
    )
    expect(dead.risk).toBe(101)
    expect(dead.status).toBe('exposed')
  })

  it('does not checkpoint on case 11 even at high risk', () => {
    const next = applyDecision(
      { ...createInitialRun(), caseIndex: 11, risk: 200 },
      { type: 'refuse', card },
    )
    expect(next.status).toBe('playing')
    expect(next.caseIndex).toBe(12)
  })

  it('dismisses a survived checkpoint and resets a new career after game over', () => {
    const survived = dismissCheckpoint({
      ...createInitialRun(),
      status: 'checkpoint',
      caseIndex: 11,
      risk: 100,
    })
    expect(survived.status).toBe('playing')
    expect(survived.caseIndex).toBe(11)

    expect(dismissCheckpoint({ ...createInitialRun(), status: 'exposed' }).status).toBe(
      'exposed',
    )
    expect(createInitialRun()).toMatchObject({
      money: 0,
      risk: 0,
      caseIndex: 1,
      ownedInvestmentIds: [],
      status: 'playing',
    })
  })
})
