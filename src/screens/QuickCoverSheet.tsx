import { Modal, Pressable, StyleSheet, View } from 'react-native'
import { CLOSE, QUICK_COVER_HINT, QUICK_COVER_TITLE, USE } from '@/copy/sk'
import { QUICK_COVER, type QuickCoverOption } from '@/content/quickCover'
import { formatEuros } from '@/game/format'
import { Button } from '@/ui/Button'
import { GameImage } from '@/ui/GameImage'
import { Text } from '@/ui/Text'
import { type IconId } from '@/theme/assets'
import { colors } from '@/theme/colors'
import { radii } from '@/theme/radii'
import { spacing } from '@/theme/spacing'

const COVER_ICONS: Record<string, IconId> = {
  cover_political: 'phone',
  bribe_prosecutor: 'envelope',
  intimidate_press: 'fist',
  fake_alibi: 'document',
  destroy_evidence: 'fire',
}

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
            {QUICK_COVER_TITLE}
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={CLOSE}
            onPress={onClose}
            hitSlop={12}
          >
            <Text variant="title" color="muted">
              ✕
            </Text>
          </Pressable>
        </View>
        <Text variant="caption" color="text" style={styles.centered}>
          {QUICK_COVER_HINT}
        </Text>
        {QUICK_COVER.map((row) => (
          <CoverRow
            key={row.id}
            option={row}
            icon={COVER_ICONS[row.id] ?? 'shield'}
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
        <Text variant="button" color="blue">
          {option.name}
        </Text>
        <Text variant="caption" color="green">
          {`Riziko ${Math.trunc(risk)}% → ${nextRisk}%`}
        </Text>
        <Text variant="caption" color={disabled ? 'red' : 'green'}>
          {disabled ? `Chýba ${formatEuros(missing)}` : `Cena ${formatEuros(option.cost)}`}
        </Text>
        {option.delayedRiskDelta > 0 ? (
          <Text variant="caption" color="red">
            {`Neskôr +${option.delayedRiskDelta}% rizika`}
          </Text>
        ) : null}
      </View>
      <Button variant="use" disabled={disabled} accessibilityLabel={`${USE} ${option.name}`} onPress={() => {
        onPick(option.id)
        onClose()
      }} style={styles.use}>
        <Text variant="button" color="onPrimary" style={styles.useText}>
          {USE}
        </Text>
      </Button>
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
  centered: {
    textAlign: 'center',
  },
  use: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.iconButton,
  },
  useText: {
    fontSize: 14,
    lineHeight: 18,
  },
})
