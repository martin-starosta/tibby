import { ScrollView, StyleSheet } from 'react-native'
import type { CareerState } from '@/career/career'
import { Card } from '@/ui/Card'
import { Screen } from '@/ui/Screen'
import { Text } from '@/ui/Text'
import { spacing } from '@/theme/spacing'

export function AchievementsScreen({ career }: { career: CareerState }) {
  const rows = [
    { ok: career.acceptedOnce, label: 'Prvý úplatok' },
    { ok: career.survivedOnce, label: 'Prežil si kontrolu' },
    { ok: career.wonOnce, label: 'Nevinný v súdny deň' },
  ]
  return (
    <Screen edges={['top']}>
      <ScrollView contentContainerStyle={styles.body}>
        <Text variant="title" color="text">
          ACHIEVEMENTY
        </Text>
        {rows.map((row) => (
          <Card key={row.label}>
            <Text variant="body" color="text">
              {row.ok ? '● ' : '○ '}
              {row.label}
            </Text>
          </Card>
        ))}
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  body: { padding: spacing.xl, gap: spacing.md },
})
