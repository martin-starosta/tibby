import { Pressable, StyleSheet, Text, View } from 'react-native'
import { ADVISOR_TIP } from '@/copy/howTo'
import { colors } from '@/theme/colors'

type Props = {
  visible: boolean
  reduceMotion?: boolean
  onDismiss: () => void
}

export function Advisor({ visible, onDismiss }: Props) {
  if (!visible) {
    return null
  }
  return (
    <View style={styles.wrap}>
      <Text style={styles.bubble}>{ADVISOR_TIP}</Text>
      <Pressable accessibilityRole="button" accessibilityLabel="Zavrieť poradkyňu" onPress={onDismiss}>
        <Text style={styles.dismiss}>OK</Text>
      </Pressable>
    </View>
  )
}

export function advisorVisible(muted: boolean, dismissed: boolean) {
  return !muted && !dismissed
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    maxWidth: 220,
    backgroundColor: '#161618',
    borderColor: colors.gold,
    borderWidth: 1,
    borderRadius: 12,
    borderCurve: 'continuous',
    padding: 12,
    gap: 8,
  },
  bubble: {
    color: colors.text,
  },
  dismiss: {
    color: colors.gold,
    fontWeight: '700',
  },
})
