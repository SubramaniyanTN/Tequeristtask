import { TamaguiComponent, TamaguiTextElement, Text } from '@my/ui'
import { RNTamaguiTextNonStyleProps } from '@tamagui/core'
import { StaticConfigPublic } from '@tamagui/web'
import { TamaDefer, TextStylePropsBase } from '@tamagui/web/src/types'
import { Pressable, PressableProps } from 'react-native'

type ButtonType = {
  onPress: () => void
  textContent: string
  pressableProps?: Partial<PressableProps>
  textProps?: Partial<typeof Text>
}

const Button = ({ onPress, textContent = '', pressableProps, textProps }: ButtonType) => {
  return (
    <Pressable {...pressableProps} onPress={onPress}>
      <Text {...textProps}>{textContent}</Text>
    </Pressable>
  )
}

export default Button
