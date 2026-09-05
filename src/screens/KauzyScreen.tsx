import { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, type Href } from 'expo-router'
import { CASES } from '@/content/deck'
import { seedCheckpoint, seedFinale } from '@/game/devSeed'
import { applyQuickCover } from '@/game/quickCover'
import { applyDecision, type CaseCard, type RunState } from '@/game/reducer'
import { useRun } from '@/save/useRun'
import { CaseCardView } from '@/screens/CaseCardView'
import { FactSheet } from '@/screens/FactSheet'
import { GameHud } from '@/screens/GameHud'
import { QuickCoverSheet } from '@/screens/QuickCoverSheet'
import { RiskGaugeScreen } from '@/screens/RiskGaugeScreen'
import { colors } from '@/theme/colors'

const KONTROLA = '/kontrola' as Href
const FINALE = '/finale' as Href

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
  const card = run ? CASES[run.caseIndex - 1] : undefined

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
    await update(applyDecision(run, { type, card }))
    setPhase({ name: 'fact', card, kind: type })
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <GameHud
        money={run.money}
        risk={run.risk}
        onPressRisk={() => setCoverOpen(true)}
        onLongPressRisk={() => setGaugeOpen(true)}
      />
      {coverOpen ? (
        <QuickCoverSheet
          money={run.money}
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
          <Text style={styles.done}>Najprv vyrieš udalosť na karte Eventy.</Text>
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
          <Text style={styles.done}>Ďalšie kauzy pribudnú v ďalšom slice.</Text>
        )}
        {__DEV__ ? (
          <View style={styles.dev}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="QA Kontrola 100"
              onPress={() => {
                void update(seedCheckpoint(100)).then(() => {
                  router.replace(KONTROLA)
                })
              }}
            >
              <Text style={styles.done}>QA Kontrola 100</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="QA Finále 49"
              onPress={() => {
                void update(seedFinale(49)).then(() => {
                  router.replace(FINALE)
                })
              }}
            >
              <Text style={styles.done}>QA Finále 49</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="QA Finále 50"
              onPress={() => {
                void update(seedFinale(50)).then(() => {
                  router.replace(FINALE)
                })
              }}
            >
              <Text style={styles.done}>QA Finále 50</Text>
            </Pressable>
          </View>
        ) : null}
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
    gap: 16,
  },
  done: {
    color: colors.muted,
  },
  dev: {
    gap: 8,
    marginTop: 24,
  },
})
