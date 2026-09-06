import { HudChip } from '@/ui/HudChip'

type Props = {
  money: number
  risk: number
  onPressRisk?: () => void
  onLongPressRisk?: () => void
}

export function GameHud({ money, risk, onPressRisk, onLongPressRisk }: Props) {
  return (
    <HudChip
      money={money}
      risk={risk}
      onPressRisk={onPressRisk}
      onLongPressRisk={onLongPressRisk}
    />
  )
}
