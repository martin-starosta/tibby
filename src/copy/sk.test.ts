import { DISCLAIMER_TEXT } from '@/copy/sk'

describe('boot copy', () => {
  it('uses the canonical satire disclaimer', () => {
    expect(DISCLAIMER_TEXT).toBe(
      'Satirická hra inšpirovaná verejne známymi kauzami. Nie je reportáž. Postavy sú herné archetypy. Zdroje nájdeš po každej kauze.',
    )
  })
})
