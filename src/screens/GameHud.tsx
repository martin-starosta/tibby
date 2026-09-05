import { Pressable, StyleSheet, Text, View } from 'react-native'
import { formatEuros, formatRiskChip } from '@/game/format'
import { colors } from '@/theme/colors'

type Props = {
  money: number
  risk: number
  onPressRisk?: () => void
}

export function GameHud({ money, risk, onPressRisk }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.money} accessibilityLabel="money">
        {formatEuros(money)}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={formatRiskChip(risk)}
        onPress={onPressRisk}
      >
        <Text style={styles.risk}>{formatRiskChip(risk)}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  money: {
    color: colors.gold,
    fontWeight: '700',
  },
  risk: {
    color: colors.text,
    fontWeight: '700',
  },
})
