import { router, type Href } from 'expo-router'
import Storage from 'expo-sqlite/kv-store'
import { createInitialRun } from '@/game/reducer'
import { asyncAgeStore } from '@/onboarding/asyncAgeStore'
import { asyncDisclaimerStore } from '@/onboarding/asyncDisclaimerStore'
import { createRunRepository } from '@/save/runSave'
import { BootGate } from '@/screens/BootGate'

const repo = createRunRepository(Storage)

export default function Index() {
  return (
    <BootGate
      store={asyncDisclaimerStore}
      ageStore={asyncAgeStore}
      onStartGame={() => {
        repo.save(createInitialRun()).then(() => router.replace('/(hub)/kauzy'))
      }}
      onLeaderboards={() => {
        router.push('/rebricky' as Href)
      }}
      onAchievements={() => {
        router.push('/achievementy' as Href)
      }}
      onSettings={() => {
        router.push('/nastavenia' as Href)
      }}
      onHowToPlay={() => {
        router.push('/ako-hrat' as Href)
      }}
      onSources={() => {
        router.push('/zdroje' as Href)
      }}
    />
  )
}
