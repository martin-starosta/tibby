import { HUB_TABS } from '@/hub/tabs'

describe('hub tabs', () => {
  it('lists five tabs with Kauzy first', () => {
    expect(HUB_TABS.map((tab) => tab.label)).toEqual([
      'Kauzy',
      'Eventy',
      'Investície',
      'Majetok',
      'Štatistiky',
    ])
    expect(HUB_TABS[0]?.route).toBe('kauzy')
  })
})
