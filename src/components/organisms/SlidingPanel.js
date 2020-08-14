import React, { useContext, useState, useRef } from 'react'
import {
  View,
  Platform,
  StyleSheet,
  Dimensions
} from 'react-native'
import SlidingUpPanel from 'rn-sliding-up-panel'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import { RootContext } from '../../context'

const { height } = Dimensions.get('window')

export default function SlidingPanel({
  children
}) {
  const { changeStatusBarTheme } = useContext(RootContext)
  const [isPanelFull, setIsPanelFull] = useState(false)
  const sliderRef = useRef()

  const onSlidePanel = (posValue, changeStatusBar) => {
    if (posValue === height) {
      changeStatusBar('light-content')
      setIsPanelFull(!isPanelFull)
    } else if (posValue === (Platform.OS === 'ios' ? 400 : 300)) {
      changeStatusBar('dark-content')
      setIsPanelFull(!isPanelFull)
    }
  }

  return (
    <SlidingUpPanel
      ref={sliderRef}
      draggableRange={{top: height, bottom: Platform.OS === 'ios' ? 400 : 300}}
      onDragEnd={value => onSlidePanel(value, changeStatusBarTheme)}
    >
      {dragHandler => (
        <View style={styles.listSchedulesContainer}>
          <View style={styles.dragHandler} {...dragHandler}>
            <MaterialIcon
              name={`keyboard-arrow-${isPanelFull ? 'down' : 'up'}`}
              size={25}
              color='#485460'
            />
          </View>
          {children}
        </View>
      )}
    </SlidingUpPanel>
  )
}

const styles = StyleSheet.create({
  listSchedulesContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1
  },
  dragHandler: {
    alignSelf: 'stretch',
    height: 64,
    alignItems: 'center',
    justifyContent: 'center'
  }
})