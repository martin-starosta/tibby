import { ScrollView, StyleSheet, View } from 'react-native'
import { INVESTMENTS } from '@/content/investments'
import {
  CLOSER,
  EXPOSED_STAMP,
  FINALE_LOSE,
  FINALE_TITLE,
  FINALE_WIN,
  MENU,
  NEW_CAREER,
  SOURCES,
} from '@/copy/sk'
import { finaleSources, isFinaleWin, recapMoney } from '@/game/finale'
import { formatEuros, formatRiskChip } from '@/game/format'
import type { CaseCard, RunState } from '@/game/reducer'
import { Button } from '@/ui/Button'
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
        <Text variant="title" color="text">
          {FINALE_TITLE}
        </Text>
        <View style={styles.artWrap}>
          <GameImage
            source={{ kind: 'illustration', id: 'finaleCourt' }}
            style={styles.art}
            contentFit="cover"
          />
          {win ? null : <Stamp label={EXPOSED_STAMP} />}
        </View>
        <Text variant="body" color="text">
          {win ? FINALE_WIN : FINALE_LOSE}
        </Text>
        <Text variant="body" color="muted">
          {`Peniaze ${formatEuros(recapMoney(run))}`}
        </Text>
        <Text variant="body" color="muted">
          {`Vrchol ${formatRiskChip(run.peakRisk)}`}
        </Text>
        <Text variant="body" color="muted">
          {`Prijaté ${run.acceptedCount} · Odmietnuté ${run.refusedCount}`}
        </Text>
        {owned.map((item) => (
          <Text key={item.id} variant="body" color="muted">
            {item.name}
          </Text>
        ))}
        <Text variant="body" color="text">
          {CLOSER}
        </Text>
        {sourcesOpen
          ? finaleSources(run, cases).map((url) => (
              <Text key={url} variant="caption" color="blue">
                {url}
              </Text>
            ))
          : null}
        <View style={styles.actions}>
          <Button
            variant={win ? 'primary' : 'danger'}
            accessibilityLabel={NEW_CAREER}
            onPress={onNewCareer}
          >
            <Button.Text variant={win ? 'primary' : 'danger'}>{NEW_CAREER}</Button.Text>
          </Button>
          <Button variant="outline" accessibilityLabel={SOURCES} onPress={onToggleSources}>
            <Button.Text variant="outline">{SOURCES}</Button.Text>
          </Button>
          <Button variant="ghost" accessibilityLabel={MENU} onPress={onMenu}>
            <Button.Text variant="ghost">{MENU}</Button.Text>
          </Button>
        </View>
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  body: {
    padding: spacing.xxl,
    gap: spacing.md,
  },
  artWrap: {
    alignItems: 'center',
    gap: spacing.md,
  },
  art: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    borderCurve: 'continuous',
    backgroundColor: colors.surfaceMuted,
  },
  actions: {
    gap: spacing.md,
    marginTop: spacing.md,
  },
})
