import { Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  CONTINUE,
  EXPOSED_BODY,
  EXPOSED_STAMP,
  KONTROLA_TITLE,
  MENU,
  NEW_CAREER,
  SURVIVED,
} from '@/copy/sk'
import { formatRiskChip } from '@/game/format'
import type { RunState } from '@/game/reducer'
import { colors } from '@/theme/colors'

type Props = {
  status: Extract<RunState['status'], 'checkpoint' | 'exposed'>
  risk: number
  onContinue: () => void
  onNewCareer: () => void
  onMenu: () => void
}

export function KontrolaScreen({ status, risk, onContinue, onNewCareer, onMenu }: Props) {
  const exposed = status === 'exposed'
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <Text style={styles.title}>{KONTROLA_TITLE}</Text>
      <Text style={styles.risk}>{formatRiskChip(risk)}</Text>
      {exposed ? (
        <Text style={styles.stamp}>{EXPOSED_STAMP}</Text>
      ) : null}
      <Text style={styles.body}>{exposed ? EXPOSED_BODY : SURVIVED}</Text>
      {exposed ? (
        <View style={styles.actions}>
          <Pressable accessibilityRole="button" accessibilityLabel={NEW_CAREER} onPress={onNewCareer} style={styles.button}>
            <Text style={styles.buttonText}>{NEW_CAREER}</Text>
          </Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel={MENU} onPress={onMenu} style={styles.button}>
            <Text style={styles.buttonText}>{MENU}</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable accessibilityRole="button" accessibilityLabel={CONTINUE} onPress={onContinue} style={styles.button}>
          <Text style={styles.buttonText}>{CONTINUE}</Text>
        </Pressable>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    gap: 16,
    justifyContent: 'center',
  },
  title: {
    color: colors.gold,
    fontWeight: '700',
    fontSize: 28,
  },
  risk: {
    color: colors.text,
    fontWeight: '700',
  },
  stamp: {
    color: colors.red,
    fontWeight: '800',
    fontSize: 36,
    transform: [{ rotate: '-12deg' }],
  },
  body: {
    color: colors.text,
  },
  actions: {
    gap: 12,
  },
  button: {
    borderColor: colors.gold,
    borderWidth: 1,
    borderRadius: 12,
    borderCurve: 'continuous',
    padding: 14,
  },
  buttonText: {
    color: colors.gold,
    fontWeight: '700',
    textAlign: 'center',
  },
})
