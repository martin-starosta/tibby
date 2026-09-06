import { ScrollView, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HOW_TO_CARDS, HOW_TO_PLAY } from '@/copy/howTo'
import { colors } from '@/theme/colors'

export function HowToPlayScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.title}>{HOW_TO_PLAY}</Text>
        {HOW_TO_CARDS.map((card) => (
          <Text key={card.title} style={styles.card}>
            {card.title}
            {'\n'}
            {card.body}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  body: { padding: 20, gap: 16 },
  title: { color: colors.gold, fontWeight: '700' },
  card: { color: colors.text },
})
