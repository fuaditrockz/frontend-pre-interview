import React from "react"
import {
  View,
  Text,
  StyleSheet,
  Platform
} from 'react-native'

import { Logo } from './atoms'

export default function Header({ deviceHeight }) {
  return (
    <View
      style={[
        styles.container,
        {
          height: Platform.OS === 'ios' ? deviceHeight * 1/9 : deviceHeight * 1/14
        }
      ]}
    >
      <Logo size={40} color='#fff' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-end',
    paddingBottom: Platform.OS === 'ios' ? 10 : 5,
    paddingHorizontal: 20
  }
})