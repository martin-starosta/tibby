import { StyleSheet, View } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'
import { Text } from '@/ui/Text'
import { colors } from '@/theme/colors'
import { spacing } from '@/theme/spacing'

type Props = {
  risk: number
  status: string
}

const SIZE = 260
const STROKE = 26
const R = (SIZE - STROKE) / 2
const CX = SIZE / 2
const CY = SIZE / 2

function polar(angleDeg: number) {
  const rad = ((angleDeg - 180) * Math.PI) / 180
  return {
    x: CX + R * Math.cos(rad),
    y: CY + R * Math.sin(rad),
  }
}

function arc(from: number, to: number) {
  const start = polar(from)
  const end = polar(to)
  const large = to - from > 180 ? 1 : 0
  return `M ${start.x} ${start.y} A ${R} ${R} 0 ${large} 1 ${end.x} ${end.y}`
}

export function RiskGauge({ risk, status }: Props) {
  const pct = Math.max(0, Math.min(100, Math.trunc(risk)))
  const needle = (pct / 100) * 180
  const tip = polar(needle)
  return (
    <View style={styles.wrap}>
      <Svg width={SIZE} height={SIZE / 2 + 24} viewBox={`0 0 ${SIZE} ${SIZE / 2 + 24}`}>
        <Path d={arc(0, 60)} stroke={colors.green} strokeWidth={STROKE} fill="none" strokeLinecap="round" />
        <Path d={arc(60, 120)} stroke={colors.gold} strokeWidth={STROKE} fill="none" strokeLinecap="round" />
        <Path d={arc(120, 180)} stroke={colors.red} strokeWidth={STROKE} fill="none" strokeLinecap="round" />
        <Circle cx={tip.x} cy={tip.y} r={STROKE / 2 + 2} fill={colors.surface} stroke={colors.text} strokeWidth={3} />
      </Svg>
      <View style={styles.center}>
        <Text variant="display" color="red" style={styles.pct}>
          {`${pct}%`}
        </Text>
        <Text variant="button" color="red" style={styles.status}>
          {status}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  center: {
    position: 'absolute',
    top: SIZE / 2 - 40,
    alignItems: 'center',
  },
  pct: {
    fontSize: 48,
    lineHeight: 52,
  },
  status: {
    textTransform: 'uppercase',
  },
})
