import { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { initialRoute } from '@/navigation/initialRoute'
import { createDisclaimerStore, type KeyValueStore } from '@/onboarding/disclaimerStore'
import { DisclaimerScreen } from '@/screens/DisclaimerScreen'
import { TitleScreen } from '@/screens/TitleScreen'
import { colors } from '@/theme/colors'

type Props = {
  store: ReturnType<typeof createDisclaimerStore>
  onStartGame: () => void
}

export function BootGate({ store, onStartGame }: Props) {
  const [acknowledged, setAcknowledged] = useState<boolean | null>(null)

  useEffect(() => {
    let cancelled = false
    store.hasAcknowledged().then((value) => {
      if (!cancelled) {
        setAcknowledged(value)
      }
    })
    return () => {
      cancelled = true
    }
  }, [store])

  if (acknowledged === null) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.gold} />
      </View>
    )
  }

  if (initialRoute(acknowledged) === 'disclaimer') {
    return (
      <DisclaimerScreen
        onContinue={() => {
          store.acknowledge().then(() => setAcknowledged(true))
        }}
      />
    )
  }

  return <TitleScreen onStartGame={onStartGame} />
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
