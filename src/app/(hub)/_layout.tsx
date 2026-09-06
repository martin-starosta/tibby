import { NativeTabs } from 'expo-router/unstable-native-tabs'
import { colors } from '@/theme/colors'
import { fonts } from '@/theme/typography'

export default function HubLayout() {
  return (
    <NativeTabs
      tintColor={colors.text}
      backgroundColor={colors.surface}
      blurEffect="none"
      iconColor={{ default: colors.muted, selected: colors.text }}
      labelStyle={{
        default: { fontFamily: fonts.bodyBold, fontSize: 11, color: colors.muted },
        selected: { fontFamily: fonts.bodyBold, fontSize: 11, color: colors.text },
      }}
    >
      <NativeTabs.Trigger name="kauzy">
        <NativeTabs.Trigger.Label>KAUZY</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="doc.text" md="description" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="eventy">
        <NativeTabs.Trigger.Label>EVENTY</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="exclamationmark.bubble" md="campaign" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="investicie">
        <NativeTabs.Trigger.Label>INVESTÍCIE</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="building.2" md="account_balance" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="majetok">
        <NativeTabs.Trigger.Label>MAJETOK</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="briefcase" md="work" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="statistiky">
        <NativeTabs.Trigger.Label>ŠTATISTIKY</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="chart.bar" md="bar_chart" />
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}
