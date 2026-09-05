import { ScrollView, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CASES } from '@/content/deck'
import { SOURCES } from '@/copy/sk'
import { colors } from '@/theme/colors'

export function contentSourceUrls() {
  return [...new Set(CASES.map((card) => card.fact.sourceUrl))]
}

export function SourcesScreen({ extraUrls = [] }: { extraUrls?: string[] }) {
  const urls = [...new Set([...extraUrls, ...contentSourceUrls()])]
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.title}>{SOURCES}</Text>
        {urls.map((url) => (
          <Text key={url} style={styles.url}>
            {url}
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
  url: { color: colors.muted },
})
