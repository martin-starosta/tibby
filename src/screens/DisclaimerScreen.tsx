import { Pressable, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CONTINUE, DISCLAIMER_TEXT } from '@/copy/sk'
import { colors } from '@/theme/colors'

type Props = {
  onContinue: () => void
}

export function DisclaimerScreen({ onContinue }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.body}>{DISCLAIMER_TEXT}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={CONTINUE}
        onPress={onContinue}
        style={styles.button}
      >
        <Text style={styles.buttonLabel}>{CONTINUE}</Text>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: 24,
    gap: 24,
  },
  body: {
    color: colors.text,
    textAlign: 'center',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: colors.gold,
    borderRadius: 12,
    borderCurve: 'continuous',
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  buttonLabel: {
    color: colors.background,
    fontWeight: '700',
  },
})
