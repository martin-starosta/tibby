import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { runOnJS } from 'react-native-reanimated'
import {
  ACCEPT,
  ACCEPT_HINT,
  BRIBE_LABEL,
  EXPOSURE_LABEL,
  REFUSE,
  REFUSE_HINT,
  SWIPE_HINT,
} from '@/copy/sk'
import { formatEuros } from '@/game/format'
import type { CaseCard } from '@/game/reducer'
import { commitFromSwipe } from '@/game/swipe'
import { colors } from '@/theme/colors'

type Props = {
  caseIndex: number
  card: CaseCard
  onAccept: () => void
  onRefuse: () => void
}

export function CaseCardView({ caseIndex, card, onAccept, onRefuse }: Props) {
  const swipe = Gesture.Pan().onEnd((event) => {
    const decision = commitFromSwipe(event.translationX, 360, event.velocityX)
    if (decision === 'accept') {
      runOnJS(onAccept)()
    }
    if (decision === 'refuse') {
      runOnJS(onRefuse)()
    }
  })

  return (
    <GestureDetector gesture={swipe}>
      <View style={styles.card}>
        <Text style={styles.kicker}>{`KAUZA #${caseIndex}: ${card.title.toUpperCase()}`}</Text>
        <Text style={styles.prompt}>{card.prompt}</Text>
        <Text style={styles.stat}>{`${BRIBE_LABEL}: ${formatEuros(card.accept.money)}`}</Text>
        <Text style={styles.stat}>{`${EXPOSURE_LABEL}: +${card.accept.risk}%`}</Text>
        <Text style={styles.hint}>{SWIPE_HINT}</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={ACCEPT}
          onPress={onAccept}
          style={styles.accept}
        >
          <Text style={styles.acceptLabel}>{ACCEPT}</Text>
          <Text style={styles.buttonHint}>{ACCEPT_HINT}</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={REFUSE}
          onPress={onRefuse}
          style={styles.refuse}
        >
          <Text style={styles.refuseLabel}>{REFUSE}</Text>
          <Text style={styles.buttonHint}>{REFUSE_HINT}</Text>
        </Pressable>
      </View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#161618',
    borderColor: colors.gold,
    borderWidth: 1,
    borderRadius: 16,
    borderCurve: 'continuous',
    padding: 20,
    gap: 12,
  },
  kicker: {
    color: colors.gold,
    fontWeight: '700',
  },
  prompt: {
    color: colors.text,
  },
  stat: {
    color: colors.text,
    fontWeight: '600',
  },
  hint: {
    color: colors.muted,
  },
  accept: {
    backgroundColor: colors.green,
    borderRadius: 12,
    borderCurve: 'continuous',
    padding: 14,
    gap: 4,
  },
  acceptLabel: {
    color: colors.text,
    fontWeight: '700',
  },
  refuse: {
    backgroundColor: colors.red,
    borderRadius: 12,
    borderCurve: 'continuous',
    padding: 14,
    gap: 4,
  },
  refuseLabel: {
    color: colors.text,
    fontWeight: '700',
  },
  buttonHint: {
    color: colors.text,
  },
})
