import { HOW_TO_CARDS } from '@/copy/howTo'

describe('How to Play copy', () => {
  it('states the 100 checkpoint and 50 finale rules', () => {
    const blob = HOW_TO_CARDS.map((card) => card.body).join(' ')
    expect(blob).toContain('100')
    expect(blob).toContain('50')
    expect(HOW_TO_CARDS).toHaveLength(4)
  })
})
