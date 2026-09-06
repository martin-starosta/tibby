import { StyleSheet } from 'react-native'
import { CONTINUE, DISCLAIMER_TEXT } from '@/copy/sk'
import { Button } from '@/ui/Button'
import { Screen } from '@/ui/Screen'
import { Text } from '@/ui/Text'
import { spacing } from '@/theme/spacing'

type Props = {
  onContinue: () => void
}

export function DisclaimerScreen({ onContinue }: Props) {
  return (
    <Screen edges={['top', 'bottom']} style={styles.container}>
      <Text variant="body" color="text" style={styles.body}>
        {DISCLAIMER_TEXT}
      </Text>
      <Button
        variant="primary"
        accessibilityLabel={CONTINUE}
        onPress={onContinue}
        style={styles.button}
      >
        <Button.Text variant="primary">{CONTINUE}</Button.Text>
      </Button>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: spacing.xxl,
    gap: spacing.xxl,
  },
  body: {
    textAlign: 'center',
  },
  button: {
    alignSelf: 'center',
  },
})
