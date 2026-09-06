import { StyleSheet } from 'react-native'
import { Text } from '@/ui/Text'
import { colors } from '@/theme/colors'

type Props = {
  label?: string
}

export function Stamp({ label = 'ODHALENÝ!' }: Props) {
  return (
    <Text variant="display" color="stamp" style={styles.stamp}>
      {label}
    </Text>
  )
}

const styles = StyleSheet.create({
  stamp: {
    color: colors.stamp,
    transform: [{ rotate: '-12deg' }],
    textAlign: 'center',
    fontSize: 40,
    lineHeight: 48,
  },
})
