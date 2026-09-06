import { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { INVESTMENTS, type Investment, type InvestmentModifier } from '@/content/investments'
import { formatEuros } from '@/game/format'
import { Chip } from '@/ui/Chip'
import { ListRow } from '@/ui/ListRow'
import { Screen } from '@/ui/Screen'
import { Text } from '@/ui/Text'
import { type IconId } from '@/theme/assets'
import { colors } from '@/theme/colors'
import { radii } from '@/theme/radii'
import { spacing } from '@/theme/spacing'

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

const SHOP_ICONS: IconId[] = ['shield', 'safe', 'monitor', 'building', 'briefcase', 'star']

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
    <Screen edges={['top']}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.body}>
        <Text variant="title" color="text">
          INVESTÍCIE
        </Text>
        <Text variant="body" color="muted">
          {SUBTITLE}
        </Text>
        <Text variant="button" color="green">
          {formatEuros(money)}
        </Text>
        <View style={styles.chips}>
          {CHIPS.map((item) => (
            <Chip
              key={item.id}
              label={item.label}
              selected={chip === item.id}
              onPress={() => setChip(item.id)}
            />
          ))}
        </View>
        {rows.map((item, index) => (
          <ShopRow
            key={item.id}
            item={item}
            icon={SHOP_ICONS[index % SHOP_ICONS.length]!}
            money={money}
            owned={ownedIds.includes(item.id)}
            onBuy={onBuy}
          />
        ))}
      </ScrollView>
    </Screen>
  )
}

function ShopRow({
  item,
  icon,
  money,
  owned,
  onBuy,
}: {
  item: Investment
  icon: IconId
  money: number
  owned: boolean
  onBuy: (id: string) => void
}) {
  const disabled = owned || item.cost > money
  return (
    <ListRow
      title={item.name}
      description={item.modifiers.map(describeModifier).join(' · ')}
      icon={icon}
      disabled={disabled}
      accessibilityLabel={item.name}
      onPress={() => onBuy(item.id)}
      trailing={
        <View style={styles.price}>
          <Text variant="caption" color="onPrimary">
            {owned ? 'Kúpené' : formatEuros(item.cost)}
          </Text>
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  body: {
    padding: spacing.xl,
    gap: spacing.md,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  price: {
    backgroundColor: colors.green,
    borderRadius: radii.chip,
    borderCurve: 'continuous',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
})
