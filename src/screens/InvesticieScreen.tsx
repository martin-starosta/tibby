import { useEffect, useState } from 'react'
import Storage from 'expo-sqlite/kv-store'
import { buyInvestment } from '@/game/investments'
import type { RunState } from '@/game/reducer'
import { createRunRepository } from '@/save/runSave'
import { ShopScreen } from '@/screens/ShopScreen'

const repo = createRunRepository(Storage)

export function InvesticieScreen() {
  const [run, setRun] = useState<RunState | null>(null)

  useEffect(() => {
    repo.load().then(setRun)
  }, [])

  if (!run) {
    return null
  }

  return (
    <ShopScreen
      money={run.money}
      ownedIds={run.ownedInvestmentIds}
      onBuy={(id) => {
        const next = buyInvestment(run, id)
        setRun(next)
        void repo.save(next)
      }}
    />
  )
}
