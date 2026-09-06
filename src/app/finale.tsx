import { useEffect, useState } from 'react'
import { router } from 'expo-router'
import Storage from '@/save/kvStore'
import { CASES } from '@/content/deck'
import { createInitialRun, type RunState } from '@/game/reducer'
import { createRunRepository } from '@/save/runSave'
import { RecapScreen } from '@/screens/RecapScreen'

const repo = createRunRepository(Storage)

export default function FinaleRoute() {
  const [run, setRun] = useState<RunState | null>(null)
  const [sourcesOpen, setSourcesOpen] = useState(false)

  useEffect(() => {
    repo.load().then(setRun)
  }, [])

  if (!run || run.status !== 'finale') {
    return null
  }

  return (
    <RecapScreen
      run={run}
      cases={CASES}
      sourcesOpen={sourcesOpen}
      onToggleSources={() => setSourcesOpen((open) => !open)}
      onNewCareer={() => {
        void repo.save(createInitialRun())
        router.replace('/')
      }}
      onMenu={() => {
        router.replace('/')
      }}
    />
  )
}
