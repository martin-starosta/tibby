import { Modal, StyleSheet, View } from 'react-native'
import { activeBonuses, riskStatus } from '@/game/riskStatus'
import { Chip } from '@/ui/Chip'
import { RiskGauge } from '@/ui/RiskGauge'
import { Text } from '@/ui/Text'
import { colors } from '@/theme/colors'
import { spacing } from '@/theme/spacing'

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
        <RiskGauge risk={risk} status={riskStatus(risk)} />
        <Text variant="body" color="muted">
          AKO ZNÍŽIŤ RIZIKO?
        </Text>
        <View style={styles.chips}>
          <Chip label="Eventy" />
          <Chip label="Investície" />
          <Chip label="Rozhodnutia" />
        </View>
        <Text variant="button" color="text">
          {`AKTÍVNE BONUSY (${bonuses.length})`}
        </Text>
        {bonuses.map((bonus) => (
          <Text key={bonus.id} variant="body" color="muted">
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
    padding: spacing.xxl,
    gap: spacing.md,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
})
