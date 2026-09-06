import { ScrollView, StyleSheet, View } from 'react-native'
import { averageRisk, xpToNext, type CareerState } from '@/career/career'
import { ACHIEVEMENTS, BOSS, CAREER_TITLE, LEADERBOARDS, LEVEL } from '@/copy/sk'
import { formatEuros } from '@/game/format'
import { Card } from '@/ui/Card'
import { ListRow } from '@/ui/ListRow'
import type { IconId } from '@/theme/assets'
import { GameImage } from '@/ui/GameImage'
import { ProgressBar } from '@/ui/ProgressBar'
import { Screen } from '@/ui/Screen'
import { Text } from '@/ui/Text'
import { colors } from '@/theme/colors'
import { spacing } from '@/theme/spacing'

type Props = {
  career: CareerState
  onLeaderboards?: () => void
  onAchievements?: () => void
}

export function CareerScreen({ career, onLeaderboards, onAchievements }: Props) {
  const need = xpToNext(career.level)
  const progress = Math.min(100, (career.xp / need) * 100)
  return (
    <Screen edges={['top']}>
      <ScrollView contentContainerStyle={styles.body}>
        <Card>
          <Text variant="title" color="text" style={styles.centered}>
            {CAREER_TITLE}
          </Text>
          <View style={styles.header}>
            <View style={styles.headerCopy}>
              <Text variant="title" color="text">
                {BOSS}
              </Text>
              <Text variant="button" color="muted">
                {`${LEVEL} ${career.level}`}
              </Text>
            </View>
            <GameImage
              source={{ kind: 'illustration', id: 'careerBoss' }}
              style={styles.avatar}
              contentFit="cover"
            />
          </View>
          <ProgressBar progress={progress} tone="green" />
          <Text variant="caption" color="muted">
            {`${career.xp} / ${need} XP`}
          </Text>
          <StatRow icon="money" label="Zarobené celkom" value={formatEuros(career.totalEarned)} tone="green" />
          <StatRow icon="envelope" label="Prijaté úplatky" value={`${career.bribesAccepted}`} tone="red" />
          <StatRow icon="shield" label="Odmietnuté kauzy" value={`${career.casesRefused}`} tone="red" />
          <StatRow icon="trophy" label="Prežité kontroly" value={`${career.auditsSurvived}`} tone="red" />
          <StatRow icon="star" label="Najdlhšia séria" value={`${career.longestStreak} kauz`} tone="green" />
          <StatRow icon="eye" label="Priemerné riziko" value={`${Math.round(averageRisk(career))}%`} tone="red" />
        </Card>
        {onLeaderboards ? (
          <ListRow icon="trophy" title={LEADERBOARDS} description="Pozri si najväčších šéfov" onPress={onLeaderboards} trailing={<Text variant="title" color="blue">›</Text>} />
        ) : null}
        {onAchievements ? (
          <ListRow icon="star" title={ACHIEVEMENTS} description="Odomkni všetky úspechy" onPress={onAchievements} trailing={<Text variant="title" color="blue">›</Text>} />
        ) : null}
      </ScrollView>
    </Screen>
  )
}

function StatRow({
  icon,
  label,
  value,
  tone,
}: {
  icon: IconId
  label: string
  value: string
  tone: 'green' | 'red'
}) {
  return (
    <View style={styles.stat}>
      <GameImage source={{ kind: 'icon', id: icon }} style={styles.statIcon} contentFit="contain" />
      <Text variant="caption" color="text" style={styles.statLabel}>
        {label.toUpperCase()}
      </Text>
      <Text variant="button" color={tone}>
        {value}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    padding: spacing.xl,
    gap: spacing.md,
  },
  centered: {
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 12,
    borderCurve: 'continuous',
    backgroundColor: colors.surfaceMuted,
  },
  headerCopy: {
    flex: 1,
    gap: 2,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: 2,
  },
  statIcon: {
    width: 20,
    height: 20,
  },
  statLabel: {
    flex: 1,
    fontWeight: '700',
  },
})
