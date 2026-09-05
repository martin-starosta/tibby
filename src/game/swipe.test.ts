import { commitFromSwipe } from '@/game/swipe'

describe('commitFromSwipe', () => {
  it('maps swipe and velocity to the same accept/refuse as the buttons', () => {
    expect(commitFromSwipe(120, 360, 0)).toBe('accept')
    expect(commitFromSwipe(-120, 360, 0)).toBe('refuse')
    expect(commitFromSwipe(10, 360, 900)).toBe('accept')
    expect(commitFromSwipe(10, 360, -900)).toBe('refuse')
    expect(commitFromSwipe(10, 360, 0)).toBeNull()
  })
})
