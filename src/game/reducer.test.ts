import { applyDecision, createInitialRun, type CaseCard } from '@/game/reducer'

const bodor: CaseCard = {
  id: 'case_bodor',
  act: 1,
  title: 'Nevyšetrovanie',
  prompt: 'Podnikateľ Bödör ponúka 50 000 € za nevyšetrovanie.',
  accept: { money: 50000, risk: 20 },
  refuse: { money: 0, risk: 0 },
  fact: {
    text: 'V skutočnosti išlo o verejne známu kauzu.',
    sourceName: 'Denník N',
    sourceUrl:
      'https://dennikn.sk/5134387/korupcny-newsfilter-gasparov-ocistec-sa-pomaly-meni-na-peklo/',
  },
}

describe('applyDecision', () => {
  it('accepts case_bodor from a new run', () => {
    const next = applyDecision(createInitialRun(), { type: 'accept', card: bodor })
    expect(next.money).toBe(50000)
    expect(next.risk).toBe(20)
    expect(next.acceptedCount).toBe(1)
    expect(next.caseIndex).toBe(2)
  })

  it('refuses case_bodor with no resource change', () => {
    const next = applyDecision(createInitialRun(), { type: 'refuse', card: bodor })
    expect(next.money).toBe(0)
    expect(next.risk).toBe(0)
    expect(next.refusedCount).toBe(1)
    expect(next.caseIndex).toBe(2)
  })

  it('floors money and risk at 0 and allows risk above 100', () => {
    const poor = applyDecision(
      { ...createInitialRun(), money: 10 },
      {
        type: 'accept',
        card: { ...bodor, accept: { money: -50, risk: 5 } },
      },
    )
    expect(poor.money).toBe(0)

    const cooled = applyDecision(
      { ...createInitialRun(), risk: 3 },
      {
        type: 'accept',
        card: { ...bodor, accept: { money: 0, risk: -10 } },
      },
    )
    expect(cooled.risk).toBe(0)

    const hot = applyDecision(
      { ...createInitialRun(), risk: 90 },
      {
        type: 'accept',
        card: { ...bodor, accept: { money: 0, risk: 20 } },
      },
    )
    expect(hot.risk).toBe(110)
  })

  it('applies pendingDelayedRisk once at the start of the next decision', () => {
    const first = applyDecision(
      { ...createInitialRun(), pendingDelayedRisk: 10 },
      { type: 'accept', card: bodor },
    )
    expect(first.risk).toBe(30)
    expect(first.pendingDelayedRisk).toBe(0)

    const second = applyDecision(first, {
      type: 'accept',
      card: { ...bodor, id: 'case_lustracia', accept: { money: 30000, risk: 15 } },
    })
    expect(second.risk).toBe(45)
  })
})
