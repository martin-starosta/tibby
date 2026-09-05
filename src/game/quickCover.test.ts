import { createInitialRun } from '@/game/reducer'
import { applyQuickCover } from '@/game/quickCover'

function funded(overrides: Partial<ReturnType<typeof createInitialRun>> = {}) {
  return { ...createInitialRun(), money: 80000, risk: 80, ...overrides }
}

describe('applyQuickCover', () => {
  it('buys political cover: −50000 money and −30 risk', () => {
    const next = applyQuickCover(funded(), 'cover_political')
    expect(next.money).toBe(30000)
    expect(next.risk).toBe(50)
    expect(next.quickCoverUsesThisAct).toBe(1)
  })

  it('floors risk at 0 when political cover overshoots', () => {
    const next = applyQuickCover(funded({ risk: 20 }), 'cover_political')
    expect(next.money).toBe(30000)
    expect(next.risk).toBe(0)
  })

  it('leaves state unchanged when political cover is unaffordable', () => {
    const start = funded({ money: 49999 })
    expect(applyQuickCover(start, 'cover_political')).toBe(start)
  })

  it('intimidate_press costs 30000, drops risk 20, and queues delayed 10', () => {
    const next = applyQuickCover(funded(), 'intimidate_press')
    expect(next.money).toBe(50000)
    expect(next.risk).toBe(60)
    expect(next.pendingDelayedRisk).toBe(10)
  })

  it('adds intimidate delayed risk instead of replacing a queued delay', () => {
    const next = applyQuickCover(funded({ pendingDelayedRisk: 10 }), 'intimidate_press')
    expect(next.money).toBe(50000)
    expect(next.risk).toBe(60)
    expect(next.pendingDelayedRisk).toBe(20)
  })

  it('applies cover riskDelta even when inv_security is owned', () => {
    const next = applyQuickCover(funded({ ownedInvestmentIds: ['inv_security'] }), 'cover_political')
    expect(next.risk).toBe(50)
  })

  it('increments uses when delayed risk is 0', () => {
    const next = applyQuickCover(funded(), 'fake_alibi')
    expect(next.money).toBe(60000)
    expect(next.risk).toBe(65)
    expect(next.pendingDelayedRisk).toBe(0)
    expect(next.quickCoverUsesThisAct).toBe(1)
  })
})
