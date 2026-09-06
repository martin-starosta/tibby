import { StyleSheet, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { ACCEPT, ACCEPT_HINT, BRIBE_LABEL, EXPOSURE_LABEL, REFUSE, REFUSE_HINT } from '@/copy/sk'
import { formatEuros } from '@/game/format'
import { Button } from '@/ui/Button'
import type { CaseCard } from '@/game/reducer'
import { commitFromSwipe } from '@/game/swipe'
import { Card } from '@/ui/Card'
import { GameImage } from '@/ui/GameImage'
import { Text } from '@/ui/Text'
import { colors } from '@/theme/colors'
import { spacing } from '@/theme/spacing'
import { fonts } from '@/theme/typography'

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
          <Text variant="title" color="onPrimary" style={styles.centered}>
            {`KAUZA #${caseIndex}`}
          </Text>
        </View>
        <View style={styles.body}>
          <Text variant="title" color="text" style={styles.centered}>
            {card.title.toUpperCase()}
          </Text>
          <Text variant="body" color="text" style={styles.centered}>
            {card.prompt}
          </Text>
          <GameImage
            source={{ kind: 'illustration', id: 'caseBribe' }}
            style={styles.art}
            contentFit="cover"
          />
          <View style={styles.statRow}>
            <Text variant="button" color="text">
              {BRIBE_LABEL}
            </Text>
            <View style={styles.statValue}>
              <Text variant="title" color="green">
                {formatEuros(card.accept.money)}
              </Text>
              <GameImage
                source={{ kind: 'icon', id: 'money' }}
                style={styles.statIcon}
                contentFit="contain"
              />
            </View>
          </View>
          <View style={[styles.statRow, styles.statRowLast]}>
            <Text variant="button" color="text">
              {EXPOSURE_LABEL}
            </Text>
            <Text variant="title" color="red">
              {`+${card.accept.risk}%`}
            </Text>
          </View>
          <View style={styles.actions}>
            <Button
              variant="accept"
              accessibilityLabel={ACCEPT}
              onPress={onAccept}
              style={styles.action}
            >
              <Button.Text variant="accept">{ACCEPT}</Button.Text>
              <Text variant="caption" color="onPrimary" style={styles.actionHint}>
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
              <Text variant="caption" color="onPrimary" style={styles.actionHint}>
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
    paddingVertical: spacing.sm,
  },
  centered: {
    textAlign: 'center',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statRowLast: {
    borderBottomWidth: 0,
  },
  statValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  statIcon: {
    width: 28,
    height: 28,
  },
  body: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  art: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    borderCurve: 'continuous',
    backgroundColor: colors.surfaceMuted,
  },
  stats: {
    gap: spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  action: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  actionHint: {
    textAlign: 'center',
    fontFamily: fonts.bodySemiBold,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 0.5,
  },
})
