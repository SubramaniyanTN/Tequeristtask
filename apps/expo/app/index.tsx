import { Text } from '@my/ui'
import { SafeAreaViewWrapper } from '../Components'
import { GestureDetector, Gesture } from 'react-native-gesture-handler'

export default function Screen() {
  const gesture = Gesture.Pan()
  return (
    <SafeAreaViewWrapper>
      <GestureDetector gesture={gesture}>
        <Text>Hello world</Text>
      </GestureDetector>
    </SafeAreaViewWrapper>
  )
}
