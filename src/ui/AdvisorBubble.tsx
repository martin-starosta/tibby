import { Pressable, StyleSheet, View } from 'react-native'
import { GameImage } from '@/ui/GameImage'
import { Text } from '@/ui/Text'
import { colors } from '@/theme/colors'
import { radii } from '@/theme/radii'
import { shadows } from '@/theme/shadows'
import { spacing } from '@/theme/spacing'

type Props = {
  tip: string
  visible: boolean
  onDismiss: () => void
}

export function AdvisorBubble({ tip, visible, onDismiss }: Props) {
  if (!visible) {
    return null
  }
  return (
    <View style={styles.wrap}>
      <GameImage
        source={{ kind: 'illustration', id: 'advisor' }}
        style={styles.avatar}
        contentFit="cover"
      />
      <View style={styles.bubble}>
        <Text variant="caption" color="text">
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
    bottom: spacing.xxl,
    maxWidth: 260,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radii.chip,
    borderCurve: 'continuous',
    borderWidth: 2,
    borderColor: colors.surface,
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
