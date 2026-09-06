import { AdvisorBubble } from '@/ui/AdvisorBubble'
import { ADVISOR_TIP } from '@/copy/howTo'

type Props = {
  visible: boolean
  reduceMotion?: boolean
  onDismiss: () => void
}

export function Advisor({ visible, onDismiss }: Props) {
  return (
    <AdvisorBubble tip={ADVISOR_TIP} visible={visible} onDismiss={onDismiss} />
  )
}

export function advisorVisible(muted: boolean, dismissed: boolean) {
  return !muted && !dismissed
}
