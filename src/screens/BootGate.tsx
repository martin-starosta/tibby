import { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { initialRoute } from '@/navigation/initialRoute'
import { createAgeStore } from '@/onboarding/ageStore'
import { createDisclaimerStore, type KeyValueStore } from '@/onboarding/disclaimerStore'
import { AgeGateScreen } from '@/screens/AgeGateScreen'
import { DisclaimerScreen } from '@/screens/DisclaimerScreen'
import { TitleScreen } from '@/screens/TitleScreen'
import { colors } from '@/theme/colors'

type Props = {
  store: ReturnType<typeof createDisclaimerStore>
  ageStore: ReturnType<typeof createAgeStore>
  onStartGame: () => void
  onSettings?: () => void
  onLeaderboards?: () => void
  onAchievements?: () => void
  onHowToPlay?: () => void
  onSources?: () => void
}

export function BootGate({
  store,
  ageStore,
  onStartGame,
  onSettings,
  onLeaderboards,
  onAchievements,
  onHowToPlay,
  onSources,
}: Props) {
  const [acknowledged, setAcknowledged] = useState<boolean | null>(null)
  const [ageConfirmed, setAgeConfirmed] = useState<boolean | null>(null)

  useEffect(() => {
    let cancelled = false
    Promise.all([store.hasAcknowledged(), ageStore.hasConfirmed()]).then(([disclaimer, age]) => {
      if (!cancelled) {
        setAcknowledged(disclaimer)
        setAgeConfirmed(age)
      }
    })
    return () => {
      cancelled = true
    }
  }, [store, ageStore])

  if (acknowledged === null || ageConfirmed === null) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.green} />
      </View>
    )
  }

  const route = initialRoute(ageConfirmed, acknowledged)
  if (route === 'age') {
    return (
      <AgeGateScreen
        onConfirm={() => {
          ageStore.confirm().then(() => setAgeConfirmed(true))
        }}
      />
    )
  }

  if (route === 'disclaimer') {
    return (
      <DisclaimerScreen
        onContinue={() => {
          store.acknowledge().then(() => setAcknowledged(true))
        }}
      />
    )
  }

  return (
    <TitleScreen
      onStartGame={onStartGame}
      onSettings={onSettings}
      onLeaderboards={onLeaderboards}
      onAchievements={onAchievements}
      onHowToPlay={onHowToPlay}
      onSources={onSources}
    />
  )
}

export function createBootStore(storage: KeyValueStore) {
  return createDisclaimerStore(storage)
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
