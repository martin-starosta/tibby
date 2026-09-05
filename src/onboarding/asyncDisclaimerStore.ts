import AsyncStorage from '@react-native-async-storage/async-storage'
import { createDisclaimerStore } from '@/onboarding/disclaimerStore'

export const asyncDisclaimerStore = createDisclaimerStore(AsyncStorage)
