import { Pressable, StyleSheet, Text, View } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { CONTINUE, IN_REALITY } from '@/copy/sk'
import type { CaseFact } from '@/game/reducer'
import { colors } from '@/theme/colors'

type Props = {
  fact: CaseFact
  moneyDelta: number
  riskDelta: number
  onContinue: () => void
}

export function FactSheet({ fact, moneyDelta, riskDelta, onContinue }: Props) {
  return (
    <View style={styles.sheet}>
      <Text style={styles.delta}>{`${moneyDelta >= 0 ? '+' : ''}${moneyDelta} €`}</Text>
      <Text style={styles.delta}>{`${riskDelta >= 0 ? '+' : ''}${riskDelta} % riziko`}</Text>
      <Text style={styles.title}>{IN_REALITY}</Text>
      <Text style={styles.body}>{fact.text}</Text>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={fact.sourceName}
        onPress={() => {
          WebBrowser.openBrowserAsync(fact.sourceUrl)
        }}
      >
        <Text style={styles.link}>{fact.sourceName}</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={CONTINUE}
        onPress={onContinue}
        style={styles.button}
      >
        <Text style={styles.buttonLabel}>{CONTINUE}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: '#161618',
    borderRadius: 16,
    borderCurve: 'continuous',
    padding: 20,
    gap: 12,
  },
  delta: {
    color: colors.gold,
    fontWeight: '700',
  },
  title: {
    color: colors.text,
    fontWeight: '700',
  },
  body: {
    color: colors.text,
  },
  link: {
    color: colors.gold,
  },
  button: {
    backgroundColor: colors.gold,
    borderRadius: 12,
    borderCurve: 'continuous',
    padding: 14,
    alignItems: 'center',
  },
  buttonLabel: {
    color: colors.background,
    fontWeight: '700',
  },
})
