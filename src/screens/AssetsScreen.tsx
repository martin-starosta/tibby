import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { INVESTMENTS } from '@/content/investments'
import { colors } from '@/theme/colors'

type Props = {
  ownedIds: string[]
}

export function AssetsScreen({ ownedIds }: Props) {
  const owned = INVESTMENTS.filter((item) => ownedIds.includes(item.id))
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.body}>
        <Text style={styles.title}>MAJETOK</Text>
        {owned.length === 0 ? (
          <Text style={styles.empty}>Zatiaľ žiadny majetok.</Text>
        ) : (
          owned.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.item}>{item.name}</Text>
              <Text style={styles.flavor}>{item.flavor}</Text>
            </View>
          ))
        )}
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
    padding: 20,
    gap: 12,
  },
  title: {
    color: colors.gold,
    fontWeight: '700',
  },
  empty: {
    color: colors.muted,
  },
  card: {
    gap: 4,
  },
  item: {
    color: colors.text,
    fontWeight: '700',
  },
  flavor: {
    color: colors.muted,
    fontWeight: '400',
  },
})
