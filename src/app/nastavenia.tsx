import { useEffect, useState } from 'react'
import Storage from 'expo-sqlite/kv-store'
import { createSettingsStore, DEFAULT_SETTINGS, type SettingsState } from '@/settings/settingsStore'
import { SettingsScreen } from '@/screens/SettingsScreen'

const store = createSettingsStore(Storage)

export default function NastaveniaRoute() {
  const [settings, setSettings] = useState<SettingsState>(DEFAULT_SETTINGS)
  useEffect(() => {
    store.load().then(setSettings)
  }, [])
  return (
    <SettingsScreen
      settings={settings}
      onChange={(next) => {
        setSettings(next)
        void store.save(next)
      }}
    />
  )
}
