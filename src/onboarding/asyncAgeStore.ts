import Storage from '@/save/kvStore'
import { createAgeStore } from '@/onboarding/ageStore'

export const asyncAgeStore = createAgeStore(Storage)
