import { Pressable, StyleSheet, View } from 'react-native'
import { GameImage } from '@/ui/GameImage'
import { Text } from '@/ui/Text'
import { colors } from '@/theme/colors'
import { radii } from '@/theme/radii'
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
    <View style={styles.row}>
      <View style={styles.moneyChip}>
        <GameImage
          source={{ kind: 'icon', id: 'money' }}
          style={styles.icon}
          contentFit="contain"
        />
        <Text variant="button" color="green" accessibilityLabel="money">
          {formatEuros(money)}
        </Text>
      </View>
      <View style={styles.riskWrap}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={formatRiskChip(risk)}
          onPress={onPressRisk}
          onLongPress={onLongPressRisk}
          style={styles.riskChip}
        >
          <GameImage
            source={{ kind: 'icon', id: 'shield' }}
            style={styles.icon}
            contentFit="contain"
          />
          <Text variant="button" color="text" style={styles.risk}>
            {formatRiskChip(risk)}
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="i"
          onPress={onLongPressRisk}
          style={styles.info}
        >
          <Text variant="button" color="blue">
            i
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    gap: spacing.md,
  },
  moneyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radii.chip,
    borderCurve: 'continuous',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  riskWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  riskChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radii.chip,
    borderCurve: 'continuous',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  risk: {
    fontWeight: '700',
  },
  info: {
    width: 32,
    height: 32,
    borderRadius: radii.chip,
    borderCurve: 'continuous',
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
})
