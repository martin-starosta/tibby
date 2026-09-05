import { router } from 'expo-router'
import { asyncDisclaimerStore } from '@/onboarding/asyncDisclaimerStore'
import { BootGate } from '@/screens/BootGate'

export default function Index() {
  return (
    <BootGate
      store={asyncDisclaimerStore}
      onStartGame={() => {
        router.replace('/(hub)/kauzy')
      }}
    />
  )
}
