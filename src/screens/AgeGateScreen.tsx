import { Pressable, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/theme/colors'

export const AGE_GATE_COPY = 'Táto hra je pre hráčov od 16 rokov. Potvrď, že máš 16 a viac.'
export const AGE_CONFIRM = 'Mám 16 a viac'

type Props = {
  onConfirm: () => void
}

export function AgeGateScreen({ onConfirm }: Props) {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.copy}>{AGE_GATE_COPY}</Text>
      <Pressable accessibilityRole="button" accessibilityLabel={AGE_CONFIRM} onPress={onConfirm} style={styles.button}>
        <Text style={styles.label}>{AGE_CONFIRM}</Text>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: 24,
    gap: 24,
  },
  copy: {
    color: colors.text,
  },
  button: {
    backgroundColor: colors.gold,
    borderRadius: 12,
    borderCurve: 'continuous',
    padding: 16,
  },
  label: {
    color: colors.background,
    fontWeight: '700',
    textAlign: 'center',
  },
})
