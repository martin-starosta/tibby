import { parseCaseCard, parseCaseDeck } from '@/content/cases'
import { CASES } from '@/content/deck'
import { EVENTS } from '@/content/events'
import { INVESTMENTS } from '@/content/investments'
import { EVENT_EVERY } from '@/game/reducer'

describe('parseCaseCard', () => {
  it('rejects a case missing sourceUrl', () => {
    expect(() =>
      parseCaseCard({
        id: 'bad',
        act: 1,
        title: 'X',
        prompt: 'Y',
        accept: { money: 1, risk: 1 },
        refuse: { money: 0, risk: 0 },
        fact: { text: 'no', sourceName: 'N' },
      }),
    ).toThrow(/sourceUrl/)
  })
})

describe('production content bible', () => {
  it('ships 30 sourced cases, 12 events, and the five investments', () => {
    expect(CASES).toHaveLength(30)
    expect(EVENTS).toHaveLength(12)
    expect(INVESTMENTS.map((item) => item.id).sort()).toEqual(
      ['inv_ally', 'inv_judge', 'inv_laundry', 'inv_media', 'inv_security'].sort(),
    )
    const ids = CASES.map((card) => card.id)
    expect(new Set(ids).size).toBe(30)
    for (const card of CASES) {
      expect(card.fact.sourceUrl).toMatch(/^https:\/\//)
    }
    const act1 = CASES.filter((card) => card.act === 1).map((card) => card.accept.money).sort((a, b) => a - b)
    const act3 = CASES.filter((card) => card.act === 3).map((card) => card.accept.money).sort((a, b) => a - b)
    expect(act3[Math.floor(act3.length / 2)]!).toBeGreaterThan(act1[Math.floor(act1.length / 2)]!)
    expect(30 / EVENT_EVERY).toBe(10)
    expect(EVENTS.length).toBeGreaterThanOrEqual(10)
    parseCaseDeck(CASES)
  })
})
