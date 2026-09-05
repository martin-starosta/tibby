import { applyDecision, createInitialRun } from '@/game/reducer'
import { CASES } from '@/content/deck'

describe('button and swipe share the reducer', () => {
  it('PRIJMI and swipe-right accept produce the same state', () => {
    const start = createInitialRun()
    const card = CASES[0]!
    const viaButton = applyDecision(start, { type: 'accept', card })
    const viaSwipe = applyDecision(start, { type: 'accept', card })
    expect(viaButton).toEqual(viaSwipe)
    expect(viaButton.money).toBe(50000)
  })
})
