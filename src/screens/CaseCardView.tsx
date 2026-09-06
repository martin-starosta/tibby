import { StyleSheet, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
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
import { Button } from '@/ui/Button'
import { Card } from '@/ui/Card'
import { GameImage } from '@/ui/GameImage'
import { Text } from '@/ui/Text'
import { colors } from '@/theme/colors'
import { spacing } from '@/theme/spacing'

type Props = {
  caseIndex: number
  card: CaseCard
  onAccept: () => void
  onRefuse: () => void
}

export function CaseCardView({ caseIndex, card, onAccept, onRefuse }: Props) {
  const swipe = Gesture.Pan()
    .runOnJS(true)
    .onEnd((event) => {
      const decision = commitFromSwipe(event.translationX, 360, event.velocityX)
      if (decision === 'accept') {
        onAccept()
      }
      if (decision === 'refuse') {
        onRefuse()
      }
    })

  return (
    <GestureDetector gesture={swipe}>
      <Card padded={false} style={styles.card}>
        <View style={styles.header}>
          <Text variant="button" color="onPrimary">
            {`KAUZA #${caseIndex}: ${card.title.toUpperCase()}`}
          </Text>
        </View>
        <View style={styles.body}>
          <GameImage
            source={{ kind: 'illustration', id: 'caseBribe' }}
            style={styles.art}
            contentFit="cover"
          />
          <Text variant="body" color="text">
            {card.prompt}
          </Text>
          <View style={styles.stats}>
            <Text variant="button" color="green">
              {`${BRIBE_LABEL}: ${formatEuros(card.accept.money)}`}
            </Text>
            <Text variant="button" color="red">
              {`${EXPOSURE_LABEL}: +${card.accept.risk}%`}
            </Text>
          </View>
          <Text variant="caption" color="muted" style={styles.hint}>
            {SWIPE_HINT}
          </Text>
          <View style={styles.actions}>
            <Button
              variant="accept"
              accessibilityLabel={ACCEPT}
              onPress={onAccept}
              style={styles.action}
            >
              <Button.Text variant="accept">{ACCEPT}</Button.Text>
              <Text variant="caption" color="onPrimary">
                {ACCEPT_HINT}
              </Text>
            </Button>
            <Button
              variant="refuse"
              accessibilityLabel={REFUSE}
              onPress={onRefuse}
              style={styles.action}
            >
              <Button.Text variant="refuse">{REFUSE}</Button.Text>
              <Text variant="caption" color="onPrimary">
                {REFUSE_HINT}
              </Text>
            </Button>
          </View>
        </View>
      </Card>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
  header: {
    backgroundColor: colors.blue,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  body: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  art: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    borderCurve: 'continuous',
    backgroundColor: colors.surfaceMuted,
  },
  stats: {
    gap: spacing.xs,
  },
  hint: {
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  action: {
    flex: 1,
  },
})
