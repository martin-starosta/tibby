import { ScrollView, StyleSheet, View } from 'react-native'
import { INVESTMENTS } from '@/content/investments'
import {
  CLOSER,
  EXPOSED_STAMP,
  FINALE_LOSE,
  FINALE_SUBTITLE,
  FINALE_TITLE,
  FINAL_RISK,
  FINALE_WIN,
  MENU,
  NEW_CAREER,
  SOURCES,
} from '@/copy/sk'
import { finaleSources, isFinaleWin, recapMoney } from '@/game/finale'
import { formatEuros, formatRiskChip } from '@/game/format'
import type { CaseCard, RunState } from '@/game/reducer'
import { Button } from '@/ui/Button'
import { Card } from '@/ui/Card'
import { GameImage } from '@/ui/GameImage'
import { Screen } from '@/ui/Screen'
import { Stamp } from '@/ui/Stamp'
import { Text } from '@/ui/Text'
import { colors } from '@/theme/colors'
import { spacing } from '@/theme/spacing'

type Props = {
  run: RunState
  cases: CaseCard[]
  sourcesOpen: boolean
  onToggleSources: () => void
  onNewCareer: () => void
  onMenu: () => void
}

export function RecapScreen({
  run,
  cases,
  sourcesOpen,
  onToggleSources,
  onNewCareer,
  onMenu,
}: Props) {
  const win = isFinaleWin(run.risk)
  const owned = INVESTMENTS.filter((item) => run.ownedInvestmentIds.includes(item.id))
  return (
    <Screen edges={['top']}>
      <ScrollView contentContainerStyle={styles.body}>
        <Card>
          <View style={styles.titleRow}>
            <GameImage
              source={{ kind: 'icon', id: 'scales' }}
              style={styles.titleIcon}
              contentFit="contain"
            />
            <Text variant="title" color="text">
              {FINALE_TITLE}
            </Text>
          </View>
          <Text variant="body" color="text" style={styles.centered}>
            {FINALE_SUBTITLE}
          </Text>
          <Text variant="button" color="text" style={styles.centered}>
            {`${FINAL_RISK} `}
            <Text variant="button" color="red">
              {`${Math.trunc(run.risk)}%`}
            </Text>
          </Text>
          <View style={styles.artWrap}>
            <GameImage
              source={{ kind: 'illustration', id: 'finaleCourt' }}
              style={styles.art}
              contentFit="cover"
            />
            {win ? null : (
              <View style={styles.stampWrap}>
                <Stamp label={EXPOSED_STAMP} />
              </View>
            )}
          </View>
          <Text variant="button" color={win ? 'green' : 'red'} style={styles.centered}>
            {win ? FINALE_WIN : FINALE_LOSE}
          </Text>
          <Text variant="body" color="text" style={styles.centered}>
            {CLOSER}
          </Text>
          <View style={styles.stats}>
            <Text variant="caption" color="muted">
              {`Peniaze ${formatEuros(recapMoney(run))}`}
            </Text>
            <Text variant="caption" color="muted">
              {`Vrchol ${formatRiskChip(run.peakRisk)}`}
            </Text>
            <Text variant="caption" color="muted">
              {`Prijaté ${run.acceptedCount} · Odmietnuté ${run.refusedCount}`}
            </Text>
            {owned.map((item) => (
              <Text key={item.id} variant="caption" color="muted">
                {item.name}
              </Text>
            ))}
          </View>
          {sourcesOpen
            ? finaleSources(run, cases).map((url) => (
                <Text key={url} variant="caption" color="blue">
                  {url}
                </Text>
              ))
            : null}
          <View style={styles.actions}>
            <Button
              variant="use"
              accessibilityLabel={MENU}
              onPress={onMenu}
              style={styles.action}
            >
              <Button.Text variant="use">{MENU}</Button.Text>
            </Button>
            <Button
              variant={win ? 'primary' : 'danger'}
              accessibilityLabel={NEW_CAREER}
              onPress={onNewCareer}
              style={styles.action}
            >
              <Button.Text variant={win ? 'primary' : 'danger'}>{NEW_CAREER}</Button.Text>
            </Button>
          </View>
          <Button variant="outline" accessibilityLabel={SOURCES} onPress={onToggleSources}>
            <Button.Text variant="outline">{SOURCES}</Button.Text>
          </Button>
        </Card>
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  body: {
    padding: spacing.xl,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  titleIcon: {
    width: 32,
    height: 32,
  },
  centered: {
    textAlign: 'center',
  },
  artWrap: {
    position: 'relative',
  },
  art: {
    width: '100%',
    height: 170,
    borderRadius: 8,
    borderCurve: 'continuous',
    backgroundColor: colors.surfaceMuted,
  },
  stampWrap: {
    position: 'absolute',
    inset: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stats: {
    alignItems: 'center',
    gap: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  action: {
    flex: 1,
  },
})
