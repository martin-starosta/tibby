import { parseCaseDeck } from '@/content/cases'
import rawCases from '@/content/cases.json'

export const CASES = parseCaseDeck(rawCases)
