import { StyleSheet } from 'react-native'
import { Screen } from '@/ui/Screen'
import { Text } from '@/ui/Text'

type Props = {
  label: string
}

export function HubPlaceholderScreen({ label }: Props) {
  return (
    <Screen edges={['top']} style={styles.container} safe>
      <Text variant="body" color="muted">
        {label}
      </Text>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
