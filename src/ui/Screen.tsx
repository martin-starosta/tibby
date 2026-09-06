import { StyleSheet, View, type ViewProps } from 'react-native'
import { SafeAreaView, type Edge } from 'react-native-safe-area-context'
import { colors } from '@/theme/colors'

type Props = ViewProps & {
  edges?: Edge[]
  safe?: boolean
}

export function Screen({
  edges = ['top'],
  safe = true,
  style,
  children,
  ...rest
}: Props) {
  if (!safe) {
    return (
      <View style={[styles.screen, style]} {...rest}>
        {children}
      </View>
    )
  }
  return (
    <SafeAreaView style={[styles.screen, style]} edges={edges} {...rest}>
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
})
