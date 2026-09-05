import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { JOURNALIST } from '@/content/events'
import { resolveEventOption } from '@/game/events'
import type { RunState } from '@/game/reducer'
import { createRunRepository } from '@/save/runSave'
import { EventScreen } from '@/screens/EventScreen'
import { HubPlaceholderScreen } from '@/screens/HubPlaceholderScreen'

const repo = createRunRepository(AsyncStorage)

export function EventyScreen() {
  const [run, setRun] = useState<RunState | null>(null)
  const [focusedOptionId, setFocusedOptionId] = useState('pay')

  useEffect(() => {
    repo.load().then(setRun)
  }, [])

  if (!run?.pendingEventId) {
    return <HubPlaceholderScreen label="Eventy" />
  }

  return (
    <EventScreen
      event={JOURNALIST}
      money={run.money}
      riskAfterIncoming={run.risk}
      focusedOptionId={focusedOptionId}
      onFocusOption={setFocusedOptionId}
      onPickOption={(id) => {
        const next = resolveEventOption(run, JOURNALIST, id)
        setRun(next)
        void repo.save(next)
      }}
    />
  )
}
