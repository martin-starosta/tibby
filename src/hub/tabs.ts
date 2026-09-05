export type HubTab = {
  route: 'kauzy' | 'eventy' | 'investicie' | 'majetok' | 'statistiky'
  label: string
  sf: string
  md: string
}

export const HUB_TABS: readonly HubTab[] = [
  { route: 'kauzy', label: 'Kauzy', sf: 'doc.text', md: 'description' },
  { route: 'eventy', label: 'Eventy', sf: 'exclamationmark.bubble', md: 'campaign' },
  { route: 'investicie', label: 'Investície', sf: 'building.2', md: 'account_balance' },
  { route: 'majetok', label: 'Majetok', sf: 'briefcase', md: 'work' },
  { route: 'statistiky', label: 'Štatistiky', sf: 'chart.bar', md: 'bar_chart' },
]
