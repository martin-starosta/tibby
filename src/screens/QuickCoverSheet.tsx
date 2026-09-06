import { Modal, Pressable, StyleSheet, View } from 'react-native'
import { CLOSE, QUICK_COVER_HINT } from '@/copy/sk'
import { QUICK_COVER, type QuickCoverOption } from '@/content/quickCover'
import { formatEuros } from '@/game/format'
import { GameImage } from '@/ui/GameImage'
import { Text } from '@/ui/Text'
import { type IconId } from '@/theme/assets'
import { colors } from '@/theme/colors'
import { radii } from '@/theme/radii'
import { spacing } from '@/theme/spacing'

const COVER_ICONS: IconId[] = ['shield', 'phone', 'envelope', 'fist', 'eye']

type Props = {
  money: number
  risk: number
  onPick: (id: string) => void
  onClose: () => void
}

export function QuickCoverSheet({ money, risk, onPick, onClose }: Props) {
  return (
    <Modal
      visible
      animationType="slide"
      presentationStyle="formSheet"
      onRequestClose={onClose}
      onDismiss={onClose}
    >
      <View style={styles.sheet}>
        <View style={styles.header}>
          <Text variant="title" color="text">
            KRYTIE
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={CLOSE}
            onPress={onClose}
            hitSlop={12}
          >
            <Text variant="button" color="muted">
              {CLOSE}
            </Text>
          </Pressable>
        </View>
        <Text variant="body" color="muted">
          {QUICK_COVER_HINT}
        </Text>
        {QUICK_COVER.map((row, index) => (
          <CoverRow
            key={row.id}
            option={row}
            icon={COVER_ICONS[index % COVER_ICONS.length]!}
            money={money}
            risk={risk}
            onPick={onPick}
            onClose={onClose}
          />
        ))}
      </View>
    </Modal>
  )
}

function CoverRow({
  option,
  icon,
  money,
  risk,
  onPick,
  onClose,
}: {
  option: QuickCoverOption
  icon: IconId
  money: number
  risk: number
  onPick: (id: string) => void
  onClose: () => void
}) {
  const missing = option.cost - money
  const disabled = missing > 0
  const nextRisk = Math.max(0, Math.trunc(risk) + option.riskDelta)
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={option.name}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={() => {
        onPick(option.id)
        onClose()
      }}
      style={[styles.row, disabled ? styles.disabled : null]}
    >
      <GameImage
        source={{ kind: 'icon', id: icon }}
        style={styles.icon}
        contentFit="contain"
        recyclingKey={icon}
      />
      <View style={styles.copy}>
        <Text variant="button" color="text">
          {option.name}
        </Text>
        <Text variant="button" color="green">
          {`Riziko ${Math.trunc(risk)}% → ${nextRisk}%`}
        </Text>
        <Text variant="caption" color="muted">
          {disabled ? `Chýba ${formatEuros(missing)}` : `Cena ${formatEuros(option.cost)}`}
        </Text>
        {option.delayedRiskDelta > 0 ? (
          <Text variant="caption" color="red">
            {`Neskôr +${option.delayedRiskDelta}% rizika`}
          </Text>
        ) : null}
      </View>
      <View style={styles.use}>
        <Text variant="caption" color="onPrimary">
          POUŽIŤ
        </Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  sheet: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.xl,
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  disabled: {
    opacity: 0.4,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: radii.iconButton,
    borderCurve: 'continuous',
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  use: {
    backgroundColor: colors.blue,
    borderRadius: radii.chip,
    borderCurve: 'continuous',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
})
