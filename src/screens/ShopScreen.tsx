import { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { INVESTMENTS, type Investment, type InvestmentModifier } from '@/content/investments'
import { YOUR_MONEY } from '@/copy/sk'
import { formatEuros } from '@/game/format'
import { Button } from '@/ui/Button'
import { GameImage } from '@/ui/GameImage'
import { Chip } from '@/ui/Chip'
import { ListRow } from '@/ui/ListRow'
import { Screen } from '@/ui/Screen'
import { Text } from '@/ui/Text'
import { type IconId } from '@/theme/assets'
import { colors } from '@/theme/colors'
import { radii } from '@/theme/radii'
import { spacing } from '@/theme/spacing'

const CHIPS = [
  { id: 'vsetko', label: 'Všetko', icon: 'car' },
  { id: 'ochrana', label: 'Ochrana', icon: 'shield' },
  { id: 'zisk', label: 'Zisk', icon: 'money' },
  { id: 'vplyv', label: 'Vplyv', icon: 'building' },
] as const satisfies ReadonlyArray<{ id: string; label: string; icon: IconId }>

type ChipId = (typeof CHIPS)[number]['id']

const SUBTITLE =
  'Investície sú trvalé pre celú hru: znižujú riziko z udalostí a kauz alebo zvyšujú úplatky.'

const TAG_LABELS: Record<string, string> = {
  '*': 'všetkých udalostiach',
  court: 'súdnych udalostiach',
  audit: 'auditoch',
}

const SHOP_ICONS: Record<string, IconId> = {
  inv_media: 'monitor',
  inv_judge: 'scales',
  inv_ally: 'briefcase',
  inv_laundry: 'safe',
  inv_guard: 'shield',
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
    <Screen edges={['top']}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.body}>
        <Text variant="title" color="text" style={styles.centered}>
          INVESTÍCIE
        </Text>
        <Text variant="caption" color="muted" style={styles.centered}>
          {SUBTITLE}
        </Text>
        <View style={styles.chips}>
          {CHIPS.map((item) => (
            <Chip
              key={item.id}
              label={item.label}
              icon={item.icon}
              selected={chip === item.id}
              onPress={() => setChip(item.id)}
            />
          ))}
        </View>
        {rows.map((item) => (
          <ShopRow
            key={item.id}
            item={item}
            icon={SHOP_ICONS[item.id] ?? 'star'}
            money={money}
            owned={ownedIds.includes(item.id)}
            onBuy={onBuy}
          />
        ))}
        <View style={styles.footer}>
          <Text variant="button" color="text">
            {YOUR_MONEY}
          </Text>
          <View style={styles.footerValue}>
            <Text variant="title" color="green">
              {formatEuros(money)}
            </Text>
            <GameImage source={{ kind: 'icon', id: 'money' }} style={styles.moneyIcon} contentFit="contain" />
          </View>
        </View>
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
        <Button
          variant="primary"
          disabled={disabled}
          accessibilityLabel={`${item.name} ${owned ? 'Kúpené' : formatEuros(item.cost)}`}
          onPress={() => onBuy(item.id)}
          style={styles.price}
        >
          <Text variant="button" color="onPrimary" style={styles.priceText}>
            {owned ? 'Kúpené' : formatEuros(item.cost)}
          </Text>
        </Button>
      }
    />
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
  chips: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  price: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.iconButton,
  },
  priceText: {
    fontSize: 14,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  moneyIcon: {
    width: 28,
    height: 28,
  },
})
