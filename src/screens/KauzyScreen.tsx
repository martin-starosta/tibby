import { ScrollView, StyleSheet, View } from 'react-native'
import { router, type Href } from 'expo-router'
import { useEffect, useState } from 'react'
import Storage from '@/save/kvStore'
import { applyCareerProgress } from '@/career/career'
import { CASES } from '@/content/deck'
import { applyQuickCover } from '@/game/quickCover'
import { applyDecision, type CaseCard, type RunState } from '@/game/reducer'
import { createCareerRepository } from '@/save/careerSave'
import { useRun } from '@/save/useRun'
import { createSettingsStore } from '@/settings/settingsStore'
import { Advisor, advisorVisible } from '@/screens/Advisor'
import { CaseCardView } from '@/screens/CaseCardView'
import { FactSheet } from '@/screens/FactSheet'
import { GameHud } from '@/screens/GameHud'
import { QuickCoverSheet } from '@/screens/QuickCoverSheet'
import { RiskGaugeScreen } from '@/screens/RiskGaugeScreen'
import { Screen } from '@/ui/Screen'
import { Text } from '@/ui/Text'
import { colors } from '@/theme/colors'
import { spacing } from '@/theme/spacing'

const KONTROLA = '/kontrola' as Href
const FINALE = '/finale' as Href
const careerRepo = createCareerRepository(Storage)
const settingsStore = createSettingsStore(Storage)

function routeForStatus(status: RunState['status']): Href | null {
  if (status === 'checkpoint' || status === 'exposed') {
    return KONTROLA
  }
  if (status === 'finale') {
    return FINALE
  }
  return null
}

type Phase =
  | { name: 'card' }
  | { name: 'fact'; card: CaseCard; kind: 'accept' | 'refuse' }

export function KauzyScreen() {
  const { run, update } = useRun()
  const [phase, setPhase] = useState<Phase>({ name: 'card' })
  const [coverOpen, setCoverOpen] = useState(false)
  const [gaugeOpen, setGaugeOpen] = useState(false)
  const [advisorMuted, setAdvisorMuted] = useState(false)
  const [advisorDismissed, setAdvisorDismissed] = useState(false)
  const card = run ? CASES[run.caseIndex - 1] : undefined

  useEffect(() => {
    settingsStore.load().then((settings) => setAdvisorMuted(settings.advisorMuted))
  }, [])

  useEffect(() => {
    setAdvisorDismissed(false)
  }, [run?.caseIndex])

  useEffect(() => {
    if (!run || phase.name === 'fact') {
      return
    }
    const nextRoute = routeForStatus(run.status)
    if (nextRoute) {
      router.replace(nextRoute)
    }
  }, [run, phase])

  if (!run) {
    return <View style={styles.screen} />
  }

  const commit = async (type: 'accept' | 'refuse') => {
    if (!card) {
      return
    }
    const next = applyDecision(run, { type, card })
    const career = await careerRepo.load()
    await careerRepo.save(applyCareerProgress(career, run, next))
    await update(next)
    setPhase({ name: 'fact', card, kind: type })
  }

  return (
    <Screen edges={['top']}>
      <GameHud
        money={run.money}
        risk={run.risk}
        onPressRisk={() => setCoverOpen(true)}
        onLongPressRisk={() => setGaugeOpen(true)}
      />
      {coverOpen ? (
        <QuickCoverSheet
          money={run.money}
          risk={run.risk}
          onClose={() => setCoverOpen(false)}
          onPick={(id) => {
            void update(applyQuickCover(run, id))
          }}
        />
      ) : null}
      {gaugeOpen ? (
        <RiskGaugeScreen
          risk={run.risk}
          ownedIds={run.ownedInvestmentIds}
          onClose={() => setGaugeOpen(false)}
        />
      ) : null}
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.body}>
        {phase.name === 'fact' ? (
          <FactSheet
            fact={phase.card.fact}
            moneyDelta={phase.kind === 'accept' ? phase.card.accept.money : phase.card.refuse.money}
            riskDelta={phase.kind === 'accept' ? phase.card.accept.risk : phase.card.refuse.risk}
            onContinue={() => {
              setPhase({ name: 'card' })
              const nextRoute = routeForStatus(run.status)
              if (nextRoute) {
                router.replace(nextRoute)
              }
            }}
          />
        ) : run.pendingEventId ? (
          <Text variant="body" color="muted">
            Najprv vyrieš udalosť na karte Eventy.
          </Text>
        ) : card ? (
          <CaseCardView
            caseIndex={run.caseIndex}
            card={card}
            onAccept={() => {
              void commit('accept')
            }}
            onRefuse={() => {
              void commit('refuse')
            }}
          />
        ) : (
          <Text variant="body" color="muted">
            Ďalšie kauzy pribudnú v ďalšom slice.
          </Text>
        )}
      </ScrollView>
      <Advisor
        visible={advisorVisible(advisorMuted, advisorDismissed)}
        onDismiss={() => setAdvisorDismissed(true)}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  body: {
    padding: spacing.xl,
    gap: spacing.lg,
  },
})
