import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { INVESTMENTS, type Investment, type InvestmentModifier } from '@/content/investments'
import { formatEuros } from '@/game/format'
import { colors } from '@/theme/colors'

const CHIPS = [
  { id: 'vsetko', label: 'Všetko' },
  { id: 'ochrana', label: 'Ochrana' },
  { id: 'zisk', label: 'Zisk' },
  { id: 'vplyv', label: 'Vplyv' },
] as const

type ChipId = (typeof CHIPS)[number]['id']

const SUBTITLE =
  'Investície sú trvalé pre celú hru: znižujú riziko z udalostí a kauz alebo zvyšujú úplatky.'

const TAG_LABELS: Record<string, string> = {
  '*': 'všetkých udalostiach',
  court: 'súdnych udalostiach',
  audit: 'auditoch',
}

function describeModifier(modifier: InvestmentModifier) {
  switch (modifier.when) {
    case 'eventIncoming':
      return `Riziko pri ${modifier.tags.map((tag) => TAG_LABELS[tag] ?? tag).join(', ')} ${modifier.riskDelta}%`
    case 'caseRiskGain':
      return `Riziko z kauz ${modifier.riskDelta}%`
    case 'bribeMoney':
      return `Úplatky ×${modifier.moneyFactor}`
  }
}

type Props = {
  money: number
  ownedIds: string[]
  onBuy: (id: string) => void
}

export function ShopScreen({ money, ownedIds, onBuy }: Props) {
  const [chip, setChip] = useState<ChipId>('vsetko')
  const rows = INVESTMENTS.filter(
    (item) => chip === 'vsetko' || item.categories.includes(chip),
  )
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.body}>
        <Text style={styles.title}>INVESTÍCIE</Text>
        <Text style={styles.subtitle}>{SUBTITLE}</Text>
        <Text style={styles.money}>{formatEuros(money)}</Text>
        <View style={styles.chips}>
          {CHIPS.map((item) => (
            <Pressable
              key={item.id}
              accessibilityRole="button"
              accessibilityLabel={item.label}
              onPress={() => setChip(item.id)}
              style={[styles.chip, chip === item.id ? styles.chipOn : null]}
            >
              <Text style={styles.chipText}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
        {rows.map((item) => (
          <ShopRow
            key={item.id}
            item={item}
            money={money}
            owned={ownedIds.includes(item.id)}
            onBuy={onBuy}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

function ShopRow({
  item,
  money,
  owned,
  onBuy,
}: {
  item: Investment
  money: number
  owned: boolean
  onBuy: (id: string) => void
}) {
  const disabled = owned || item.cost > money
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={item.name}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={() => onBuy(item.id)}
      style={[styles.row, disabled ? styles.disabled : null]}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.effect}>{item.modifiers.map(describeModifier).join(' · ')}</Text>
      <Text style={styles.flavor}>{item.flavor}</Text>
      <Text style={styles.meta}>{owned ? 'Kúpené' : formatEuros(item.cost)}</Text>
    </Pressable>
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
  subtitle: {
    color: colors.muted,
  },
  effect: {
    color: colors.gold,
  },
  flavor: {
    color: colors.muted,
    fontStyle: 'italic',
  },
  money: {
    color: colors.gold,
    fontWeight: '700',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderColor: colors.muted,
    borderWidth: 1,
    borderRadius: 999,
    borderCurve: 'continuous',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipOn: {
    borderColor: colors.gold,
  },
  chipText: {
    color: colors.text,
  },
  row: {
    borderColor: colors.muted,
    borderWidth: 1,
    borderRadius: 12,
    borderCurve: 'continuous',
    padding: 14,
    gap: 4,
  },
  disabled: {
    opacity: 0.4,
  },
  name: {
    color: colors.text,
    fontWeight: '700',
  },
  meta: {
    color: colors.muted,
  },
})
