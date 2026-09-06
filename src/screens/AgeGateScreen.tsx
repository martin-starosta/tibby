import { StyleSheet } from 'react-native'
import { Button } from '@/ui/Button'
import { Screen } from '@/ui/Screen'
import { Text } from '@/ui/Text'
import { colors } from '@/theme/colors'
import { spacing } from '@/theme/spacing'

export const AGE_GATE_COPY = 'Táto hra je pre hráčov od 16 rokov. Potvrď, že máš 16 a viac.'
export const AGE_CONFIRM = 'Mám 16 a viac'

type Props = {
  onConfirm: () => void
}

export function AgeGateScreen({ onConfirm }: Props) {
  return (
    <Screen edges={['top', 'bottom']} style={styles.screen}>
      <Text variant="body" color="text">
        {AGE_GATE_COPY}
      </Text>
      <Button variant="primary" accessibilityLabel={AGE_CONFIRM} onPress={onConfirm}>
        <Button.Text variant="primary">{AGE_CONFIRM}</Button.Text>
      </Button>
    </Screen>
  )
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    padding: spacing.xxl,
    gap: spacing.xxl,
    backgroundColor: colors.background,
  },
})
