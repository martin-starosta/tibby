import { initialRoute } from '@/navigation/initialRoute'

describe('initialRoute', () => {
  it('sends unseen players to the disclaimer', () => {
    expect(initialRoute(false)).toBe('disclaimer')
  })

  it('sends acknowledged players to the title', () => {
    expect(initialRoute(true)).toBe('title')
  })
})
