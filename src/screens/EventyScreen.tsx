import { useState } from 'react'
import { eventById } from '@/content/events'
import { resolveEventOption } from '@/game/events'
import { useRun } from '@/save/useRun'
import { EventScreen } from '@/screens/EventScreen'
import { HubPlaceholderScreen } from '@/screens/HubPlaceholderScreen'

export function EventyScreen() {
  const { run, update } = useRun()
  const [focusedOptionId, setFocusedOptionId] = useState('pay')

  const event = run?.pendingEventId ? eventById(run.pendingEventId) : undefined
  if (!run || !event) {
    return <HubPlaceholderScreen label="Eventy" />
  }

  return (
    <EventScreen
      event={event}
      money={run.money}
      riskAfterIncoming={run.risk}
      focusedOptionId={focusedOptionId}
      onFocusOption={setFocusedOptionId}
      onPickOption={(id) => {
        void update(resolveEventOption(run, event, id))
      }}
    />
  )
}
