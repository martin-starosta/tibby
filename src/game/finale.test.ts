import { applyDecision, createInitialRun, type CaseCard } from '@/game/reducer'
import { finaleSources, isFinale, isFinaleWin, recapMoney } from '@/game/finale'

const card: CaseCard = {
  id: 'case_x',
  act: 3,
  title: 'x',
  prompt: 'x',
  accept: { money: 0, risk: 0 },
  refuse: { money: 0, risk: 0 },
  fact: { text: 't', sourceName: 'N', sourceUrl: 'https://example.com/a' },
}

describe('finale rules', () => {
  it('is only after case 30', () => {
    expect(isFinale(29)).toBe(false)
    expect(isFinale(30)).toBe(true)
    expect(isFinale(31)).toBe(false)
  })

  it('wins below 50 risk and loses at 50 and above', () => {
    expect(isFinaleWin(49)).toBe(true)
    expect(isFinaleWin(50)).toBe(false)
  })

  it('seizes recap money on a loss', () => {
    expect(recapMoney({ ...createInitialRun(), money: 80000, risk: 49 })).toBe(80000)
    expect(recapMoney({ ...createInitialRun(), money: 80000, risk: 50 })).toBe(0)
  })

  it('enters finale after resolving case 30 and records the case source', () => {
    const win = applyDecision(
      { ...createInitialRun(), caseIndex: 30, risk: 40 },
      { type: 'refuse', card },
    )
    expect(win.status).toBe('finale')
    expect(win.caseIndex).toBe(31)
    expect(win.resolvedCaseIds).toEqual(['case_x'])
    expect(finaleSources(win, [card])).toEqual(['https://example.com/a'])

    const lose = applyDecision(
      { ...createInitialRun(), caseIndex: 30, risk: 50, money: 10 },
      { type: 'refuse', card },
    )
    expect(lose.status).toBe('finale')
    expect(isFinaleWin(lose.risk)).toBe(false)
  })
})
