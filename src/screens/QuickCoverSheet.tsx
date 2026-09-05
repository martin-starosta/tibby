import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { QUICK_COVER, type QuickCoverOption } from '@/content/quickCover'
import { formatEuros } from '@/game/format'
import { colors } from '@/theme/colors'

type Props = {
  money: number
  onPick: (id: string) => void
  onClose: () => void
}

export function QuickCoverSheet({ money, onPick, onClose }: Props) {
  return (
    <Modal
      visible
      animationType="slide"
      presentationStyle="formSheet"
      onRequestClose={onClose}
    >
      <View style={styles.sheet}>
        <Text style={styles.title}>KRYTIE</Text>
        {QUICK_COVER.map((row) => (
          <CoverRow key={row.id} option={row} money={money} onPick={onPick} onClose={onClose} />
        ))}
      </View>
    </Modal>
  )
}

function CoverRow({
  option,
  money,
  onPick,
  onClose,
}: {
  option: QuickCoverOption
  money: number
  onPick: (id: string) => void
  onClose: () => void
}) {
  const missing = option.cost - money
  const disabled = missing > 0
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
      <Text style={styles.name}>{option.name}</Text>
      <Text style={styles.meta}>
        {disabled
          ? `Chýba ${formatEuros(missing)}`
          : `${formatEuros(option.cost)} · ${option.riskDelta}%`}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  sheet: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    gap: 12,
  },
  title: {
    color: colors.gold,
    fontWeight: '700',
  },
  row: {
    borderColor: colors.muted,
    borderWidth: 1,
    borderRadius: 12,
    borderCurve: 'continuous',
    padding: 14,
    gap: 4,
  },
  disabled: {
    opacity: 0.4,
  },
  name: {
    color: colors.text,
    fontWeight: '700',
  },
  meta: {
    color: colors.muted,
  },
})
