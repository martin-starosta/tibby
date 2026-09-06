import { ScrollView, StyleSheet } from 'react-native'
import { HOW_TO_CARDS, HOW_TO_PLAY } from '@/copy/howTo'
import { Card } from '@/ui/Card'
import { Screen } from '@/ui/Screen'
import { Text } from '@/ui/Text'
import { spacing } from '@/theme/spacing'

export function HowToPlayScreen() {
  return (
    <Screen edges={['top']}>
      <ScrollView contentContainerStyle={styles.body}>
        <Text variant="title" color="text">
          {HOW_TO_PLAY}
        </Text>
        {HOW_TO_CARDS.map((card) => (
          <Card key={card.title}>
            <Text variant="button" color="text">
              {card.title}
            </Text>
            <Text variant="body" color="muted">
              {card.body}
            </Text>
          </Card>
        ))}
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  body: { padding: spacing.xl, gap: spacing.lg },
})
