import { NativeTabs } from 'expo-router/unstable-native-tabs'
import { colors } from '@/theme/colors'

export default function HubLayout() {
  return (
    <NativeTabs tintColor={colors.gold}>
      <NativeTabs.Trigger name="kauzy">
        <NativeTabs.Trigger.Label>Kauzy</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="doc.text" md="description" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="eventy">
        <NativeTabs.Trigger.Label>Eventy</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="exclamationmark.bubble" md="campaign" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="investicie">
        <NativeTabs.Trigger.Label>Investície</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="building.2" md="account_balance" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="majetok">
        <NativeTabs.Trigger.Label>Majetok</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="briefcase" md="work" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="statistiky">
        <NativeTabs.Trigger.Label>Štatistiky</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="chart.bar" md="bar_chart" />
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}
