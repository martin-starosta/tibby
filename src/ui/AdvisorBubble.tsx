import { Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { GameImage } from '@/ui/GameImage'
import { Text } from '@/ui/Text'
import { colors } from '@/theme/colors'
import { radii } from '@/theme/radii'
import { shadows } from '@/theme/shadows'
import { spacing } from '@/theme/spacing'
import { fonts } from '@/theme/typography'

/** Clearance above NativeTabs so the bubble is not covered by the bar. */
const TAB_BAR_CLEARANCE = 56

type Props = {
  tip: string
  visible: boolean
  onDismiss: () => void
}

export function AdvisorBubble({ tip, visible, onDismiss }: Props) {
  const insets = useSafeAreaInsets()
  if (!visible) {
    return null
  }
  return (
    <View style={[styles.wrap, { bottom: insets.bottom + TAB_BAR_CLEARANCE }]}>
      <GameImage
        source={{ kind: 'illustration', id: 'advisor' }}
        style={styles.avatar}
        contentFit="cover"
      />
      <View style={styles.bubble}>
        <Text variant="button" color="blue">
          TIP:
        </Text>
        <Text variant="caption" color="blue" style={styles.tip}>
          {tip}
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Zavrieť poradkyňu"
          onPress={onDismiss}
        >
          <Text variant="button" color="blue">
            OK
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    right: spacing.lg,
    left: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: radii.card,
    borderCurve: 'continuous',
  },
  tip: {
    fontFamily: fonts.bodySemiBold,
  },
  bubble: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
    ...shadows.raised,
  },
})
