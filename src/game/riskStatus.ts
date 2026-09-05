import { INVESTMENTS } from '@/content/investments'

export function riskStatus(risk: number) {
  if (risk > 100) {
    return 'Odhalenie'
  }
  if (risk >= 80) {
    return 'Kritické'
  }
  if (risk >= 50) {
    return 'Na hrane'
  }
  if (risk >= 30) {
    return 'Pod dohľadom'
  }
  return 'Pokoj'
}

export function activeBonuses(ownedIds: string[]) {
  return INVESTMENTS.filter((item) => ownedIds.includes(item.id)).map((item) => ({
    id: item.id,
    name: item.name,
    effect: item.flavor,
  }))
}
