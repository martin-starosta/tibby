import { Modal, ScrollView, StyleSheet, View } from 'react-native'
import { ACTIVE_BONUSES, HOW_TO_LOWER_RISK, RISK_EXPLAINER } from '@/copy/sk'
import { activeBonuses, riskStatus } from '@/game/riskStatus'
import { Card } from '@/ui/Card'
import { GameImage } from '@/ui/GameImage'
import { RiskGauge } from '@/ui/RiskGauge'
import { Text } from '@/ui/Text'
import type { IconId } from '@/theme/assets'
import { colors } from '@/theme/colors'
import { spacing } from '@/theme/spacing'

const TIPS: Array<{ icon: IconId; label: string; hint: string }> = [
  { icon: 'star', label: 'Eventy', hint: 'Reaguj na udalosti' },
  { icon: 'building', label: 'Investície', hint: 'Kúp majetok, ktorý ťa kryje' },
  { icon: 'scales', label: 'Rozhodnutia', hint: 'Nie každá kauza sa oplatí' },
]

type Props = {
  risk: number
  ownedIds: string[]
  onClose: () => void
}

export function RiskGaugeScreen({ risk, ownedIds, onClose }: Props) {
  const bonuses = activeBonuses(ownedIds)
  return (
    <Modal visible animationType="fade" presentationStyle="formSheet" onRequestClose={onClose}>
      <ScrollView style={styles.sheet} contentContainerStyle={styles.body}>
        <RiskGauge risk={risk} status={riskStatus(risk)} />
        <Text variant="caption" color="text" style={styles.centered}>
          {RISK_EXPLAINER}
        </Text>
        <Card>
          <Text variant="button" color="text" style={styles.centered}>
            {HOW_TO_LOWER_RISK}
          </Text>
          <View style={styles.tips}>
            {TIPS.map((tip) => (
              <View key={tip.label} style={styles.tip}>
                <GameImage
                  source={{ kind: 'icon', id: tip.icon }}
                  style={styles.tipIcon}
                  contentFit="contain"
                />
                <Text variant="caption" color="text" style={styles.tipLabel}>
                  {tip.label}
                </Text>
                <Text variant="caption" color="muted" style={styles.centered}>
                  {tip.hint}
                </Text>
              </View>
            ))}
          </View>
          <Text variant="button" color="text" style={styles.centered}>
            {`${ACTIVE_BONUSES} (${bonuses.length})`}
          </Text>
          {bonuses.map((bonus) => (
            <Text key={bonus.id} variant="caption" color="muted" style={styles.centered}>
              {`${bonus.name} — ${bonus.effect}`}
            </Text>
          ))}
        </Card>
      </ScrollView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  sheet: {
    flex: 1,
    backgroundColor: colors.background,
  },
  body: {
    padding: spacing.xl,
    gap: spacing.md,
    alignItems: 'stretch',
  },
  centered: {
    textAlign: 'center',
  },
  tips: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  tip: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderCurve: 'continuous',
    padding: spacing.sm,
  },
  tipIcon: {
    width: 36,
    height: 36,
  },
  tipLabel: {
    fontWeight: '700',
    textTransform: 'uppercase',
  },
})
