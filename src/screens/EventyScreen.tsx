import { useState } from 'react'
import { JOURNALIST } from '@/content/events'
import { resolveEventOption } from '@/game/events'
import { useRun } from '@/save/useRun'
import { EventScreen } from '@/screens/EventScreen'
import { HubPlaceholderScreen } from '@/screens/HubPlaceholderScreen'

export function EventyScreen() {
  const { run, update } = useRun()
  const [focusedOptionId, setFocusedOptionId] = useState('pay')

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
        void update(resolveEventOption(run, JOURNALIST, id))
      }}
    />
  )
}
