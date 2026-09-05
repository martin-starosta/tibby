import { applyDecision, createInitialRun, type CaseCard } from '@/game/reducer'
import {
  applyEventIncoming,
  projectedRisk,
  resolveEventOption,
} from '@/game/events'
import { JOURNALIST, GOV_SUPPORT } from '@/content/events'

const bodor: CaseCard = {
  id: 'case_bodor',
  act: 1,
  title: 'Nevyšetrovanie',
  prompt: 'x',
  accept: { money: 50000, risk: 20 },
  refuse: { money: 0, risk: 0 },
  fact: {
    text: 't',
    sourceName: 'N',
    sourceUrl: 'https://example.com',
  },
}

function playThreeAccepts() {
  let state = createInitialRun()
  state = applyDecision(state, { type: 'accept', card: bodor })
  state = applyDecision(state, { type: 'accept', card: { ...bodor, id: 'b' } })
  state = applyDecision(state, { type: 'accept', card: { ...bodor, id: 'c' } })
  return state
}

describe('pending events', () => {
  it('queues an event after every third resolved case and locks the next case', () => {
    const afterTwo = applyDecision(
      applyDecision(createInitialRun(), { type: 'accept', card: bodor }),
      { type: 'accept', card: { ...bodor, id: 'b' } },
    )
    expect(afterTwo.pendingEventId).toBeNull()

    const afterThree = playThreeAccepts()
    expect(afterThree.pendingEventId).toBe('novinar')
    expect(afterThree.caseIndex).toBe(4)

    const locked = applyDecision(afterThree, { type: 'accept', card: bodor })
    expect(locked).toEqual(afterThree)
  })

  it('applies journalist incoming then Pay', () => {
    const start = { ...createInitialRun(), money: 50000, risk: 35 }
    const afterIncoming = applyEventIncoming(start, JOURNALIST)
    expect(afterIncoming.risk).toBe(55)
    const paid = resolveEventOption(afterIncoming, JOURNALIST, 'pay')
    expect(paid.money).toBe(20000)
    expect(paid.risk).toBe(35)
    expect(paid.pendingEventId).toBeNull()
    expect(paid.pendingDelayedRisk).toBe(0)
  })

  it('queues delayed risk from threaten and ignores unaffordable options', () => {
    const start = applyEventIncoming(
      { ...createInitialRun(), money: 50000, risk: 35 },
      JOURNALIST,
    )
    const threatened = resolveEventOption(start, JOURNALIST, 'threaten')
    expect(threatened.money).toBe(40000)
    expect(threatened.risk).toBe(45)
    expect(threatened.pendingDelayedRisk).toBe(10)

    const broke = resolveEventOption(
      applyEventIncoming({ ...createInitialRun(), money: 10000, risk: 35 }, JOURNALIST),
      JOURNALIST,
      'pay',
    )
    expect(broke.money).toBe(10000)
    expect(broke.pendingEventId).not.toBeNull()
  })

  it('applies gift incoming that can lower risk to the floor', () => {
    const gifted = applyEventIncoming({ ...createInitialRun(), risk: 10 }, GOV_SUPPORT)
    expect(gifted.risk).toBe(0)
  })

  it('projects risk as incoming plus the focused option, not delayed', () => {
    expect(projectedRisk(35, JOURNALIST, 'pay')).toBe(35)
    expect(projectedRisk(35, JOURNALIST, 'threaten')).toBe(45)
    expect(projectedRisk(35, JOURNALIST, 'ignore')).toBe(55)
  })
})
