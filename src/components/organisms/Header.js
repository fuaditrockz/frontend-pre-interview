import React, { useContext } from "react"
import {
  View,
  StyleSheet,
  Platform
} from 'react-native'

import { RootContext } from '../../context'
import { Logo } from '../atoms'

export default function Header({
  deviceHeight
}) {
  const { currentScreen, theme: { panelFullMode } } = useContext(RootContext)
  const sliderIsFullonRightScreen =  (currentScreen === 'SetupFlightSchedule') && panelFullMode
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: sliderIsFullonRightScreen ? '#fff' : '#6C75F4',
          height: Platform.OS === 'ios' ? deviceHeight * 1/9 : deviceHeight * 1/18
        }
      ]}
    >
      <Logo size={40} color={sliderIsFullonRightScreen ? '#6C75F4' : '#fff'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-end',
    paddingBottom: Platform.OS === 'ios' ? 10 : 2,
    paddingHorizontal: 20
  }
})