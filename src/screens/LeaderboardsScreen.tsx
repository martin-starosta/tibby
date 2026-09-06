import { ScrollView, StyleSheet } from 'react-native'
import type { CareerState } from '@/career/career'
import { formatEuros, formatRiskChip } from '@/game/format'
import { Card } from '@/ui/Card'
import { Screen } from '@/ui/Screen'
import { Text } from '@/ui/Text'
import { spacing } from '@/theme/spacing'

export function LeaderboardsScreen({ career }: { career: CareerState }) {
  return (
    <Screen edges={['top']}>
      <ScrollView contentContainerStyle={styles.body}>
        <Text variant="title" color="text">
          REBRÍČKY
        </Text>
        {career.bestWins.length === 0 ? (
          <Text variant="body" color="muted">
            Zatiaľ žiadne víťazstvá.
          </Text>
        ) : (
          career.bestWins.map((win, index) => (
            <Card key={`${win.risk}-${index}`}>
              <Text variant="body" color="text">
                {`${formatRiskChip(win.risk)} · ${formatEuros(win.money)}`}
              </Text>
            </Card>
          ))
        )}
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  body: { padding: spacing.xl, gap: spacing.md },
})
