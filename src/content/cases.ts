import type { CaseCard } from '@/game/reducer'

export function parseCaseCard(raw: unknown): CaseCard {
  if (typeof raw !== 'object' || raw === null) {
    throw new Error('Case must be an object')
  }
  const card = raw as Partial<CaseCard> & { fact?: Partial<CaseCard['fact']> }
  if (!card.fact?.sourceUrl) {
    throw new Error('Case fact.sourceUrl is required')
  }
  if (
    typeof card.id !== 'string' ||
    typeof card.act !== 'number' ||
    typeof card.title !== 'string' ||
    typeof card.prompt !== 'string' ||
    typeof card.accept?.money !== 'number' ||
    typeof card.accept.risk !== 'number' ||
    typeof card.refuse?.money !== 'number' ||
    typeof card.refuse.risk !== 'number' ||
    typeof card.fact.text !== 'string' ||
    typeof card.fact.sourceName !== 'string'
  ) {
    throw new Error('Case is missing required fields')
  }
  return card as CaseCard
}

export function parseCaseDeck(raw: unknown): CaseCard[] {
  if (!Array.isArray(raw)) {
    throw new Error('Case deck must be an array')
  }
  return raw.map(parseCaseCard)
}
