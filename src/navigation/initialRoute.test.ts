import { initialRoute } from '@/navigation/initialRoute'

describe('initialRoute', () => {
  it('blocks the hub until age is confirmed', () => {
    expect(initialRoute(false, false)).toBe('age')
    expect(initialRoute(false, true)).toBe('age')
  })

  it('sends unseen players to the disclaimer after the age gate', () => {
    expect(initialRoute(true, false)).toBe('disclaimer')
  })

  it('sends acknowledged players to the title', () => {
    expect(initialRoute(true, true)).toBe('title')
  })
})
