import { ScrollView, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import type { CareerState } from '@/career/career'
import { formatEuros, formatRiskChip } from '@/game/format'
import { colors } from '@/theme/colors'

export function LeaderboardsScreen({ career }: { career: CareerState }) {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.title}>REBRÍČKY</Text>
        {career.bestWins.length === 0 ? (
          <Text style={styles.row}>Zatiaľ žiadne víťazstvá.</Text>
        ) : (
          career.bestWins.map((win, index) => (
            <Text key={`${win.risk}-${index}`} style={styles.row}>
              {`${formatRiskChip(win.risk)} · ${formatEuros(win.money)}`}
            </Text>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  body: { padding: 20, gap: 12 },
  title: { color: colors.gold, fontWeight: '700' },
  row: { color: colors.text },
})
