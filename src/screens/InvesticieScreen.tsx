import { buyInvestment } from '@/game/investments'
import { useRun } from '@/save/useRun'
import { ShopScreen } from '@/screens/ShopScreen'

export function InvesticieScreen() {
  const { run, update } = useRun()

  if (!run) {
    return null
  }

  return (
    <ShopScreen
      money={run.money}
      ownedIds={run.ownedInvestmentIds}
      onBuy={(id) => {
        void update(buyInvestment(run, id))
      }}
    />
  )
}
