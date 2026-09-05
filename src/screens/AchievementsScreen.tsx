import { ScrollView, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import type { CareerState } from '@/career/career'
import { colors } from '@/theme/colors'

export function AchievementsScreen({ career }: { career: CareerState }) {
  const rows = [
    { ok: career.acceptedOnce, label: 'Prvý úplatok' },
    { ok: career.survivedOnce, label: 'Prežil si kontrolu' },
    { ok: career.wonOnce, label: 'Nevinný v súdny deň' },
  ]
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.title}>ACHIEVEMENTY</Text>
        {rows.map((row) => (
          <Text key={row.label} style={styles.row}>
            {row.ok ? '● ' : '○ '}
            {row.label}
          </Text>
        ))}
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
