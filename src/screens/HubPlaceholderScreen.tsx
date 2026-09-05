import { StyleSheet, Text, View } from 'react-native'
import { colors } from '@/theme/colors'

type Props = {
  label: string
}

export function HubPlaceholderScreen({ label }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: colors.muted,
  },
})
