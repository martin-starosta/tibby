import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { averageRisk, xpToNext, type CareerState } from '@/career/career'
import { colors } from '@/theme/colors'

type Props = {
  career: CareerState
}

export function CareerScreen({ career }: Props) {
  const need = xpToNext(career.level)
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.title}>KARIÉRA — ŠÉF</Text>
        <Text style={styles.stat}>{`Level ${career.level}`}</Text>
        <View style={styles.bar}>
          <View style={[styles.fill, { width: `${Math.min(100, (career.xp / need) * 100)}%` }]} />
        </View>
        <Text style={styles.stat}>{`XP ${career.xp} / ${need}`}</Text>
        <Text style={styles.stat}>{`Zarobené ${career.totalEarned}`}</Text>
        <Text style={styles.stat}>{`Úplatky ${career.bribesAccepted}`}</Text>
        <Text style={styles.stat}>{`Odmietnuté ${career.casesRefused}`}</Text>
        <Text style={styles.stat}>{`Kontroly ${career.auditsSurvived}`}</Text>
        <Text style={styles.stat}>{`Séria ${career.longestStreak}`}</Text>
        <Text style={styles.stat}>{`Priemerné riziko ${Math.round(averageRisk(career))}%`}</Text>
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
  stat: {
    color: colors.text,
  },
  bar: {
    height: 8,
    backgroundColor: colors.muted,
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: 8,
    backgroundColor: colors.gold,
  },
})
