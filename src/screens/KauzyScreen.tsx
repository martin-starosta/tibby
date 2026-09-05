import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CASES } from '@/content/deck'
import { applyDecision, type CaseCard, type RunState } from '@/game/reducer'
import { createRunRepository } from '@/save/runSave'
import { CaseCardView } from '@/screens/CaseCardView'
import { FactSheet } from '@/screens/FactSheet'
import { GameHud } from '@/screens/GameHud'
import { colors } from '@/theme/colors'

const repo = createRunRepository(AsyncStorage)

type Phase =
  | { name: 'card' }
  | { name: 'fact'; card: CaseCard; kind: 'accept' | 'refuse' }

export function KauzyScreen() {
  const [run, setRun] = useState<RunState | null>(null)
  const [phase, setPhase] = useState<Phase>({ name: 'card' })
  const card = run ? CASES[run.caseIndex - 1] : undefined

  useEffect(() => {
    repo.load().then(setRun)
  }, [])

  if (!run) {
    return <View style={styles.screen} />
  }

  const commit = async (type: 'accept' | 'refuse') => {
    if (!card) {
      return
    }
    const next = applyDecision(run, { type, card })
    await repo.save(next)
    setRun(next)
    setPhase({ name: 'fact', card, kind: type })
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <GameHud money={run.money} risk={run.risk} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.body}>
        {phase.name === 'fact' ? (
          <FactSheet
            fact={phase.card.fact}
            moneyDelta={phase.kind === 'accept' ? phase.card.accept.money : phase.card.refuse.money}
            riskDelta={phase.kind === 'accept' ? phase.card.accept.risk : phase.card.refuse.risk}
            onContinue={() => setPhase({ name: 'card' })}
          />
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
