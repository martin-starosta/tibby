import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CASES } from '@/content/deck'
import { applyQuickCover } from '@/game/quickCover'
import { applyDecision, type CaseCard } from '@/game/reducer'
import { useRun } from '@/save/useRun'
import { CaseCardView } from '@/screens/CaseCardView'
import { FactSheet } from '@/screens/FactSheet'
import { GameHud } from '@/screens/GameHud'
import { QuickCoverSheet } from '@/screens/QuickCoverSheet'
import { colors } from '@/theme/colors'

type Phase =
  | { name: 'card' }
  | { name: 'fact'; card: CaseCard; kind: 'accept' | 'refuse' }

export function KauzyScreen() {
  const { run, update } = useRun()
  const [phase, setPhase] = useState<Phase>({ name: 'card' })
  const [coverOpen, setCoverOpen] = useState(false)
  const card = run ? CASES[run.caseIndex - 1] : undefined

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
      <GameHud money={run.money} risk={run.risk} onPressRisk={() => setCoverOpen(true)} />
      {coverOpen ? (
        <QuickCoverSheet
          money={run.money}
          onClose={() => setCoverOpen(false)}
          onPick={(id) => {
            void update(applyQuickCover(run, id))
          }}
        />
      ) : null}
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.body}>
        {phase.name === 'fact' ? (
          <FactSheet
            fact={phase.card.fact}
            moneyDelta={phase.kind === 'accept' ? phase.card.accept.money : phase.card.refuse.money}
            riskDelta={phase.kind === 'accept' ? phase.card.accept.risk : phase.card.refuse.risk}
            onContinue={() => setPhase({ name: 'card' })}
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
})
