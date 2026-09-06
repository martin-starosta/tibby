import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { CLOSE, QUICK_COVER_HINT } from '@/copy/sk'
import { QUICK_COVER, type QuickCoverOption } from '@/content/quickCover'
import { formatEuros } from '@/game/format'
import { colors } from '@/theme/colors'

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
          <Text style={styles.title}>KRYTIE</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={CLOSE}
            onPress={onClose}
            hitSlop={12}
          >
            <Text style={styles.close}>{CLOSE}</Text>
          </Pressable>
        </View>
        <Text style={styles.hint}>{QUICK_COVER_HINT}</Text>
        {QUICK_COVER.map((row) => (
          <CoverRow
            key={row.id}
            option={row}
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
  money,
  risk,
  onPick,
  onClose,
}: {
  option: QuickCoverOption
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
      <Text style={styles.name}>{option.name}</Text>
      <Text style={styles.benefit}>{`Riziko ${Math.trunc(risk)}% → ${nextRisk}%`}</Text>
      <Text style={styles.meta}>
        {disabled ? `Chýba ${formatEuros(missing)}` : `Cena ${formatEuros(option.cost)}`}
      </Text>
      {option.delayedRiskDelta > 0 ? (
        <Text style={styles.warning}>{`Neskôr +${option.delayedRiskDelta}% rizika`}</Text>
      ) : null}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.gold,
    fontWeight: '700',
  },
  hint: {
    color: colors.muted,
  },
  close: {
    color: colors.muted,
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
  benefit: {
    color: colors.gold,
    fontWeight: '700',
  },
  meta: {
    color: colors.muted,
  },
  warning: {
    color: colors.red,
  },
})
