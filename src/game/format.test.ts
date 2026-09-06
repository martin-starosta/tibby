import { formatEuros, formatRiskChip } from '@/game/format'

describe('format', () => {
  it('formats HUD money like the prototype', () => {
    expect(formatEuros(125450)).toBe('125\u00A0450\u00A0€')
    expect(formatEuros(0)).toBe('0\u00A0€')
  })

  it('formats the risk chip with a number', () => {
    expect(formatRiskChip(58)).toBe('RIZIKO 58%')
  })
})
