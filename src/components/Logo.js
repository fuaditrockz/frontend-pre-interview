import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import JetPlane from '../../assets/icons/plane.svg'

export default function Logo({ size, color }) {
  const {
    container,
    text
  } = styles

  return (
    <View
      style={[
        container,
        { width: size * 3.5 }
      ]}
    >
      <JetPlane height={size} width={size} fill={color} />
      <Text
        style={[
          { color, fontSize: (size / 2) + 3 },
          text
        ]}
      >
        Aviator
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    fontFamily: 'Poppins-Bold',
    marginTop: 5
  }
})