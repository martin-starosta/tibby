import Storage from '@/save/kvStore'
import { createDisclaimerStore } from '@/onboarding/disclaimerStore'

export const asyncDisclaimerStore = createDisclaimerStore(Storage)
