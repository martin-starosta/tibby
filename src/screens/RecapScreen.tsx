import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { INVESTMENTS } from '@/content/investments'
import {
  CLOSER,
  EXPOSED_STAMP,
  FINALE_LOSE,
  FINALE_TITLE,
  FINALE_WIN,
  MENU,
  NEW_CAREER,
  SOURCES,
} from '@/copy/sk'
import { finaleSources, isFinaleWin, recapMoney } from '@/game/finale'
import { formatEuros, formatRiskChip } from '@/game/format'
import type { CaseCard, RunState } from '@/game/reducer'
import { colors } from '@/theme/colors'

type Props = {
  run: RunState
  cases: CaseCard[]
  sourcesOpen: boolean
  onToggleSources: () => void
  onNewCareer: () => void
  onMenu: () => void
}

export function RecapScreen({
  run,
  cases,
  sourcesOpen,
  onToggleSources,
  onNewCareer,
  onMenu,
}: Props) {
  const win = isFinaleWin(run.risk)
  const owned = INVESTMENTS.filter((item) => run.ownedInvestmentIds.includes(item.id))
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.title}>{FINALE_TITLE}</Text>
        {win ? null : <Text style={styles.stamp}>{EXPOSED_STAMP}</Text>}
        <Text style={styles.copy}>{win ? FINALE_WIN : FINALE_LOSE}</Text>
        <Text style={styles.stat}>{`Peniaze ${formatEuros(recapMoney(run))}`}</Text>
        <Text style={styles.stat}>{`Vrchol ${formatRiskChip(run.peakRisk)}`}</Text>
        <Text style={styles.stat}>{`Prijaté ${run.acceptedCount} · Odmietnuté ${run.refusedCount}`}</Text>
        {owned.map((item) => (
          <Text key={item.id} style={styles.stat}>
            {item.name}
          </Text>
        ))}
        <Text style={styles.copy}>{CLOSER}</Text>
        {sourcesOpen
          ? finaleSources(run, cases).map((url) => (
              <Text key={url} style={styles.stat}>
                {url}
              </Text>
            ))
          : null}
        <View style={styles.actions}>
          <Pressable accessibilityRole="button" accessibilityLabel={NEW_CAREER} onPress={onNewCareer} style={styles.button}>
            <Text style={styles.buttonText}>{NEW_CAREER}</Text>
          </Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel={SOURCES} onPress={onToggleSources} style={styles.button}>
            <Text style={styles.buttonText}>{SOURCES}</Text>
          </Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel={MENU} onPress={onMenu} style={styles.button}>
            <Text style={styles.buttonText}>{MENU}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  body: {
    padding: 24,
    gap: 12,
  },
  title: {
    color: colors.gold,
    fontWeight: '700',
    fontSize: 28,
  },
  stamp: {
    color: colors.red,
    fontWeight: '800',
    fontSize: 36,
    transform: [{ rotate: '-12deg' }],
  },
  copy: {
    color: colors.text,
  },
  stat: {
    color: colors.muted,
  },
  actions: {
    gap: 12,
    marginTop: 12,
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
