import { useEffect, useState } from 'react'
import Storage from 'expo-sqlite/kv-store'
import type { RunState } from '@/game/reducer'
import { createRunRepository } from '@/save/runSave'
import { AssetsScreen } from '@/screens/AssetsScreen'

const repo = createRunRepository(Storage)

export function MajetokScreen() {
  const [run, setRun] = useState<RunState | null>(null)

  useEffect(() => {
    repo.load().then(setRun)
  }, [])

  if (!run) {
    return null
  }

  return <AssetsScreen ownedIds={run.ownedInvestmentIds} />
}
