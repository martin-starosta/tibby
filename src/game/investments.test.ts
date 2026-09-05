import { JOURNALIST, type GameEvent } from '@/content/events'
import { applyEventIncoming, resolveEventOption } from '@/game/events'
import { buyInvestment } from '@/game/investments'
import { applyQuickCover } from '@/game/quickCover'
import { applyDecision, createInitialRun, type CaseCard } from '@/game/reducer'

const bodor: CaseCard = {
  id: 'case_bodor',
  act: 1,
  title: 'Nevyšetrovanie',
  prompt: 'x',
  accept: { money: 50000, risk: 20 },
  refuse: { money: 0, risk: 0 },
  fact: { text: 't', sourceName: 'N', sourceUrl: 'https://example.com' },
}

const AUDIT: GameEvent = {
  ...JOURNALIST,
  id: 'audit',
  tags: ['audit'],
  incomingRisk: 30,
}

const COURT: GameEvent = {
  ...JOURNALIST,
  id: 'court',
  tags: ['court'],
  incomingRisk: 40,
}

function rich(owned: string[] = []) {
  return {
    ...createInitialRun(),
    money: 400000,
    risk: 40,
    ownedInvestmentIds: owned,
  }
}

describe('buyInvestment', () => {
  it('deducts cost once with no risk change and rejects duplicates and broke buys', () => {
    const bought = buyInvestment(rich(), 'inv_security')
    expect(bought.money).toBe(350000)
    expect(bought.risk).toBe(40)
    expect(bought.ownedInvestmentIds).toEqual(['inv_security'])
    expect(buyInvestment(bought, 'inv_security')).toBe(bought)

    const broke = buyInvestment(createInitialRun(), 'inv_security')
    expect(broke).toEqual(createInitialRun())
  })
})

describe('investment modifiers', () => {
  it('launders accepted bribes with integer floor', () => {
    const laundry = { ...createInitialRun(), ownedInvestmentIds: ['inv_laundry'] }
    const next = applyDecision(laundry, { type: 'accept', card: bodor })
    expect(next.money).toBe(60000)

    const odd = applyDecision(
      laundry,
      { type: 'accept', card: { ...bodor, accept: { money: 33333, risk: 0 } } },
    )
    expect(odd.money).toBe(Math.floor(33333 * 1.2))
  })

  it('security reduces only positive case risk gains, not Quick Cover or event options', () => {
    const secured = applyDecision(
      { ...createInitialRun(), ownedInvestmentIds: ['inv_security'] },
      { type: 'accept', card: bodor },
    )
    expect(secured.risk).toBe(15)

    const covered = applyQuickCover(
      { ...createInitialRun(), money: 80000, risk: 80, ownedInvestmentIds: ['inv_security'] },
      'cover_political',
    )
    expect(covered.risk).toBe(50)

    const afterIncoming = applyEventIncoming(
      { ...createInitialRun(), money: 50000, risk: 35, ownedInvestmentIds: ['inv_security'] },
      JOURNALIST,
    )
    const paid = resolveEventOption(afterIncoming, JOURNALIST, 'pay')
    expect(paid.risk).toBe(afterIncoming.risk - 20)
  })

  it('applies event incoming tag filters, wildcards, and additive floor', () => {
    expect(applyEventIncoming(rich(['inv_judge']), JOURNALIST).risk).toBe(60)
    expect(applyEventIncoming(rich(['inv_judge']), COURT).risk).toBe(65)
    expect(applyEventIncoming(rich(['inv_media']), JOURNALIST).risk).toBe(50)
    expect(applyEventIncoming(rich(['inv_media', 'inv_ally']), AUDIT).risk).toBe(40)
  })
})
