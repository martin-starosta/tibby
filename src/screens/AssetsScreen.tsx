import { ScrollView, StyleSheet } from 'react-native'
import { INVESTMENTS } from '@/content/investments'
import { Card } from '@/ui/Card'
import { Screen } from '@/ui/Screen'
import { Text } from '@/ui/Text'
import { spacing } from '@/theme/spacing'

type Props = {
  ownedIds: string[]
}

export function AssetsScreen({ ownedIds }: Props) {
  const owned = INVESTMENTS.filter((item) => ownedIds.includes(item.id))
  return (
    <Screen edges={['top']}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.body}>
        <Text variant="title" color="text">
          MAJETOK
        </Text>
        {owned.length === 0 ? (
          <Text variant="body" color="muted">
            Zatiaľ žiadny majetok.
          </Text>
        ) : (
          owned.map((item) => (
            <Card key={item.id}>
              <Text variant="button" color="text">
                {item.name}
              </Text>
              <Text variant="caption" color="muted">
                {item.flavor}
              </Text>
            </Card>
          ))
        )}
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  body: {
    padding: spacing.xl,
    gap: spacing.md,
  },
})
