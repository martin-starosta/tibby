import { applyDecision, createInitialRun, type CaseCard } from '@/game/reducer'
import {
  applyCareerProgress,
  createInitialCareer,
  insertBestWin,
  type CareerState,
} from '@/career/career'

const bodor: CaseCard = {
  id: 'case_bodor',
  act: 1,
  title: 'x',
  prompt: 'x',
  accept: { money: 50000, risk: 20 },
  refuse: { money: 0, risk: 0 },
  fact: { text: 't', sourceName: 'N', sourceUrl: 'https://example.com' },
}

describe('career XP', () => {
  it('applies the XP table and levels when xp crosses 100 * level', () => {
    let career = createInitialCareer()
    career = applyCareerProgress(career, createInitialRun(), applyDecision(createInitialRun(), { type: 'refuse', card: bodor }))
    expect(career.xp).toBe(10)
    career = applyCareerProgress(career, createInitialRun(), applyDecision(createInitialRun(), { type: 'accept', card: bodor }))
    expect(career.xp).toBe(25)

    const afterSurvive = applyCareerProgress(
      createInitialCareer(),
      { ...createInitialRun(), caseIndex: 10, risk: 80 },
      applyDecision({ ...createInitialRun(), caseIndex: 10, risk: 80 }, { type: 'refuse', card: bodor }),
    )
    expect(afterSurvive.xp).toBe(35)
    expect(afterSurvive.auditsSurvived).toBe(1)

    const win = applyCareerProgress(
      createInitialCareer(),
      { ...createInitialRun(), caseIndex: 30, risk: 40 },
      applyDecision({ ...createInitialRun(), caseIndex: 30, risk: 40 }, { type: 'refuse', card: bodor }),
    )
    expect(win.xp).toBe(60)
    expect(win.wonOnce).toBe(true)

    const lose = applyCareerProgress(
      createInitialCareer(),
      { ...createInitialRun(), caseIndex: 30, risk: 50 },
      applyDecision({ ...createInitialRun(), caseIndex: 30, risk: 50 }, { type: 'refuse', card: bodor }),
    )
    expect(lose.xp).toBe(15)

    let ding: CareerState = { ...createInitialCareer(), xp: 95, level: 1 }
    ding = applyCareerProgress(
      ding,
      createInitialRun(),
      applyDecision(createInitialRun(), { type: 'refuse', card: bodor }),
    )
    expect(ding.level).toBe(2)
    expect(ding.xp).toBe(5)
  })

  it('does not change bribe payouts at a high level', () => {
    const low = applyDecision(createInitialRun(), { type: 'accept', card: bodor })
    const high = applyDecision(createInitialRun(), { type: 'accept', card: bodor })
    expect(low.money).toBe(50000)
    expect(high.money).toBe(low.money)
    expect(high.risk).toBe(low.risk)
  })

  it('keeps lifetime accepts across runs while run counts reset', () => {
    const first = applyCareerProgress(
      createInitialCareer(),
      createInitialRun(),
      applyDecision(createInitialRun(), { type: 'accept', card: bodor }),
    )
    const secondRun = applyCareerProgress(
      first,
      createInitialRun(),
      applyDecision(createInitialRun(), { type: 'accept', card: bodor }),
    )
    expect(secondRun.bribesAccepted).toBe(2)
    expect(createInitialRun().acceptedCount).toBe(0)
  })

  it('ranks lowest-risk wins first', () => {
    const empty = createInitialCareer()
    const with49 = insertBestWin(empty, 49, 1000)
    const with40 = insertBestWin(with49, 40, 500)
    expect(with40.bestWins[0]).toEqual({ risk: 40, money: 500 })
  })
})
