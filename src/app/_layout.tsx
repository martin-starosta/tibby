import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import { colors } from '@/theme/colors'
import { fonts } from '@/theme/typography'

export default function RootLayout() {
  const [loaded] = useFonts({
    [fonts.body]: require('../../assets/fonts/IBMPlexSans-Regular.ttf'),
    [fonts.bodySemiBold]: require('../../assets/fonts/IBMPlexSans-SemiBold.ttf'),
    [fonts.bodyBold]: require('../../assets/fonts/IBMPlexSans-Bold.ttf'),
    [fonts.display]: require('../../assets/fonts/StardosStencil-Bold.ttf'),
  })

  if (!loaded) {
    return (
      <View style={styles.boot}>
        <ActivityIndicator color={colors.green} />
      </View>
    )
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="dark" />
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  boot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
})
