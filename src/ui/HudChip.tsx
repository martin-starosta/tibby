import { Pressable, StyleSheet, View } from 'react-native'
import { GameImage } from '@/ui/GameImage'
import { Text } from '@/ui/Text'
import { colors } from '@/theme/colors'
import { radii } from '@/theme/radii'
import { shadows } from '@/theme/shadows'
import { spacing } from '@/theme/spacing'
import { formatEuros, formatRiskChip } from '@/game/format'

type Props = {
  money: number
  risk: number
  onPressRisk?: () => void
  onLongPressRisk?: () => void
}

export function HudChip({ money, risk, onPressRisk, onLongPressRisk }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.pill}>
        <View style={styles.group}>
          <GameImage
            source={{ kind: 'icon', id: 'money' }}
            style={styles.icon}
            contentFit="contain"
          />
          <Text
            variant="title"
            color="text"
            accessibilityLabel="money"
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.value}
          >
            {formatEuros(money)}
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={formatRiskChip(risk)}
          onPress={onPressRisk}
          onLongPress={onLongPressRisk}
          style={styles.group}
        >
          <GameImage
            source={{ kind: 'icon', id: 'shield' }}
            style={styles.icon}
            contentFit="contain"
          />
          <Text
            variant="title"
            color="text"
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.value}
          >
            RIZIKO{' '}
            <Text variant="title" color="red">
              {`${Math.trunc(risk)}%`}
            </Text>
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="+"
          onPress={onLongPressRisk}
          style={styles.plus}
        >
          <Text variant="title" color="onPrimary">
            +
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    borderCurve: 'continuous',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  group: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  value: {
    flexShrink: 1,
  },
  icon: {
    width: 32,
    height: 32,
    flexShrink: 0,
  },
  plus: {
    width: 32,
    height: 32,
    borderRadius: radii.iconButton,
    borderCurve: 'continuous',
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
