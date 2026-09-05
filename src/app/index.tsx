import { StyleSheet, Text, View } from 'react-native'

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>OČISTEC THE GAME</Text>
        <Text style={styles.tagline}>
          STAŇ SA LEGENDOU. ALEBO SA NECHAJ ODHALIŤ.
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#0B0B0C',
  },
  hero: {
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontWeight: '700',
    color: '#F4F1EA',
  },
  tagline: {
    color: '#9A958C',
    textAlign: 'center',
  },
})
