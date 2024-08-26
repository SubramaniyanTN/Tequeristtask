import { StyleSheet, useColorScheme, TextStyle, ViewStyle } from 'react-native'
import { TextStyle as MUITextStyle, ButtonProps, InputProps } from '@my/ui'

type UseStylesType = {
  textStyle: TextStyle
  container: ViewStyle
  muitextStyle: MUITextStyle
  buttonStyle: ButtonProps['style']
  inputStyle: InputProps
}

const darkStyle: UseStylesType = {
  textStyle: {
    color: 'gray',
  },
  container: {
    backgroundColor: '#000',
  },
  muitextStyle: {
    color: 'white',
  },
  buttonStyle: {
    backgroundColor: 'black',
  },
  inputStyle: {
    borderColor: 'white',
  },
}
const lightStyle: UseStylesType = {
  textStyle: {
    color: '#000',
  },
  container: {
    backgroundColor: '#FFFFFF',
  },
  muitextStyle: {
    color: 'black',
  },
  buttonStyle: {
    backgroundColor: 'white',
  },
  inputStyle: {},
}

const useStyles = () => {
  const isDark = useColorScheme() === 'dark'
  return isDark ? darkStyle : lightStyle
}

export default useStyles
