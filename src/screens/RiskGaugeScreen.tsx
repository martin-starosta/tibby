import { Modal, StyleSheet, Text, View } from 'react-native'
import { activeBonuses, riskStatus } from '@/game/riskStatus'
import { formatRiskChip } from '@/game/format'
import { colors } from '@/theme/colors'

type Props = {
  risk: number
  ownedIds: string[]
  onClose: () => void
}

export function RiskGaugeScreen({ risk, ownedIds, onClose }: Props) {
  const bonuses = activeBonuses(ownedIds)
  return (
    <Modal visible animationType="fade" presentationStyle="formSheet" onRequestClose={onClose}>
      <View style={styles.sheet}>
        <Text style={styles.number}>{formatRiskChip(risk)}</Text>
        <Text style={styles.status}>{riskStatus(risk)}</Text>
        <View style={styles.chips}>
          <Text style={styles.chip}>Eventy</Text>
          <Text style={styles.chip}>Investície</Text>
          <Text style={styles.chip}>Rozhodnutia</Text>
        </View>
        {bonuses.map((bonus) => (
          <Text key={bonus.id} style={styles.bonus}>
            {`${bonus.name} — ${bonus.effect}`}
          </Text>
        ))}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  sheet: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    gap: 12,
  },
  number: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 32,
  },
  status: {
    color: colors.gold,
    fontWeight: '700',
    fontSize: 24,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    color: colors.text,
    borderColor: colors.muted,
    borderWidth: 1,
    borderRadius: 999,
    borderCurve: 'continuous',
    paddingHorizontal: 12,
    paddingVertical: 8,
    overflow: 'hidden',
  },
  bonus: {
    color: colors.muted,
  },
})
