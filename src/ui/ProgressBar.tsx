import { StyleSheet, View } from 'react-native'
import { colors } from '@/theme/colors'
import { radii } from '@/theme/radii'

type Props = {
  progress: number
  tone?: 'green' | 'red' | 'gold'
}

export function ProgressBar({ progress, tone = 'green' }: Props) {
  const clamped = Math.max(0, Math.min(100, progress))
  const fill =
    tone === 'red' ? colors.red : tone === 'gold' ? colors.gold : colors.green
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${clamped}%`, backgroundColor: fill }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  track: {
    height: 8,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.chip,
    overflow: 'hidden',
  },
  fill: {
    height: 8,
    borderRadius: radii.chip,
  },
})
