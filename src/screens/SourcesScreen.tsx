import { ScrollView, StyleSheet } from 'react-native'
import { CASES } from '@/content/deck'
import { SOURCES } from '@/copy/sk'
import { Screen } from '@/ui/Screen'
import { Text } from '@/ui/Text'
import { spacing } from '@/theme/spacing'

export function contentSourceUrls() {
  return [...new Set(CASES.map((card) => card.fact.sourceUrl))]
}

export function SourcesScreen({ extraUrls = [] }: { extraUrls?: string[] }) {
  const urls = [...new Set([...extraUrls, ...contentSourceUrls()])]
  return (
    <Screen edges={['top']}>
      <ScrollView contentContainerStyle={styles.body}>
        <Text variant="title" color="text">
          {SOURCES}
        </Text>
        {urls.map((url) => (
          <Text key={url} variant="caption" color="blue">
            {url}
          </Text>
        ))}
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  body: { padding: spacing.xl, gap: spacing.md },
})
