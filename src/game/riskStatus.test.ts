import { activeBonuses, riskStatus } from '@/game/riskStatus'

describe('riskStatus', () => {
  it('maps band boundaries', () => {
    expect(riskStatus(0)).toBe('Pokoj')
    expect(riskStatus(29)).toBe('Pokoj')
    expect(riskStatus(30)).toBe('Pod dohľadom')
    expect(riskStatus(49)).toBe('Pod dohľadom')
    expect(riskStatus(50)).toBe('Na hrane')
    expect(riskStatus(79)).toBe('Na hrane')
    expect(riskStatus(80)).toBe('Kritické')
    expect(riskStatus(100)).toBe('Kritické')
    expect(riskStatus(101)).toBe('Odhalenie')
  })
})

describe('activeBonuses', () => {
  it('lists only currently owned investments', () => {
    expect(activeBonuses([])).toEqual([])
    expect(activeBonuses(['inv_media']).map((row) => row.id)).toEqual(['inv_media'])
    expect(activeBonuses(['inv_media', 'missing'])).toHaveLength(1)
  })
})
