import { ScrollView, StyleSheet, View } from 'react-native'
import { averageRisk, xpToNext, type CareerState } from '@/career/career'
import { Card } from '@/ui/Card'
import { GameImage } from '@/ui/GameImage'
import { ProgressBar } from '@/ui/ProgressBar'
import { Screen } from '@/ui/Screen'
import { Text } from '@/ui/Text'
import { colors } from '@/theme/colors'
import { spacing } from '@/theme/spacing'

type Props = {
  career: CareerState
}

export function CareerScreen({ career }: Props) {
  const need = xpToNext(career.level)
  const progress = Math.min(100, (career.xp / need) * 100)
  return (
    <Screen edges={['top']}>
      <ScrollView contentContainerStyle={styles.body}>
        <Card>
          <View style={styles.header}>
            <GameImage
              source={{ kind: 'illustration', id: 'careerBoss' }}
              style={styles.avatar}
              contentFit="cover"
            />
            <View style={styles.headerCopy}>
              <Text variant="title" color="text">
                KARIÉRA — ŠÉF
              </Text>
              <Text variant="button" color="muted">
                {`Level ${career.level}`}
              </Text>
            </View>
          </View>
          <ProgressBar progress={progress} tone="green" />
          <Text variant="caption" color="muted">
            {`XP ${career.xp} / ${need}`}
          </Text>
        </Card>
        <StatRow label={`Zarobené ${career.totalEarned}`} />
        <StatRow label={`Úplatky ${career.bribesAccepted}`} />
        <StatRow label={`Odmietnuté ${career.casesRefused}`} />
        <StatRow label={`Kontroly ${career.auditsSurvived}`} />
        <StatRow label={`Séria ${career.longestStreak}`} />
        <StatRow label={`Priemerné riziko ${Math.round(averageRisk(career))}%`} />
      </ScrollView>
    </Screen>
  )
}

function StatRow({ label }: { label: string }) {
  return (
    <View style={styles.stat}>
      <Text variant="body" color="text">
        {label}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    padding: spacing.xl,
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderCurve: 'continuous',
    backgroundColor: colors.surfaceMuted,
  },
  headerCopy: {
    flex: 1,
    gap: 4,
  },
  stat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
})
