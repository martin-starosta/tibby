import { useEffect, useState } from 'react'
import { router } from 'expo-router'
import Storage from '@/save/kvStore'
import { dismissCheckpoint } from '@/game/checkpoint'
import { createInitialRun, type RunState } from '@/game/reducer'
import { createRunRepository } from '@/save/runSave'
import { KontrolaScreen } from '@/screens/KontrolaScreen'

const repo = createRunRepository(Storage)

export default function KontrolaRoute() {
  const [run, setRun] = useState<RunState | null>(null)

  useEffect(() => {
    repo.load().then(setRun)
  }, [])

  if (!run || (run.status !== 'checkpoint' && run.status !== 'exposed')) {
    return null
  }

  return (
    <KontrolaScreen
      status={run.status}
      risk={run.risk}
      onContinue={() => {
        const next = dismissCheckpoint(run)
        void repo.save(next)
        router.replace('/(hub)/kauzy')
      }}
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
