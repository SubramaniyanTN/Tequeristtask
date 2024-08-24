import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SafeAreaViewWrapper = ({ children }: { children: React.ReactNode }) => (
  <SafeAreaView style={styles.SafeAreaViewStyle}>{children}</SafeAreaView>
)

export default SafeAreaViewWrapper

const styles = StyleSheet.create({
  SafeAreaViewStyle: {
    flex: 1,
  },
})
