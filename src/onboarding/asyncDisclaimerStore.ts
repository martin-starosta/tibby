import Storage from 'expo-sqlite/kv-store'
import { createDisclaimerStore } from '@/onboarding/disclaimerStore'

export const asyncDisclaimerStore = createDisclaimerStore(Storage)
