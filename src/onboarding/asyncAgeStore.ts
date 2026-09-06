import Storage from 'expo-sqlite/kv-store'
import { createAgeStore } from '@/onboarding/ageStore'

export const asyncAgeStore = createAgeStore(Storage)
