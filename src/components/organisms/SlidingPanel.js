import React, { useContext, useState, useEffect } from 'react'
import {
  View,
  Platform,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity
} from 'react-native'
import SlidingUpPanel from 'rn-sliding-up-panel'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import { RootContext } from '../../context'

const { height } = Dimensions.get('window')

export default function SlidingPanel({
  children
}) {
  const { theme: { panelFullMode }, onSliderChange } = useContext(RootContext)
  const [isPanelFull, setIsPanelFull] = useState(false)
  const [sliderRef, setSliderRef] = useState()

  const onSlidePanel = (posValue, changeStatusBar) => {
    if (posValue === height) {
      changeStatusBar('full')
      setIsPanelFull(!isPanelFull)
    } else if (posValue === (Platform.OS === 'ios' ? 400 : 300)) {
      changeStatusBar('down')
      setIsPanelFull(!isPanelFull)
    }
  }

  const onPressSeeMore = () => {
    sliderRef.show()
    onSliderChange('full')
  }

  const onPressCloseSlider = () => {
    sliderRef.hide()
    onSliderChange('down')
  }

  return (
    <SlidingUpPanel
      ref={c => setSliderRef(c)}
      snappingPoints={[400, height]}
      draggableRange={{top: height, bottom: Platform.OS === 'ios' ? 400 : 400}}
      onDragEnd={value => onSlidePanel(value, onSliderChange)}
    >
      {dragHandler => (
        <View style={styles.listSchedulesContainer}>
          <View style={styles.dragHandler} {...dragHandler}>
            <View style={styles.dragHandlerWrapper}>
              <MaterialIcon
                name={`keyboard-arrow-${panelFullMode ? 'down' : 'up'}`}
                size={25}
                color='#485460'
              />
            </View>
          </View>
          <View style={[
            styles.contentContainer,
            { paddingTop: panelFullMode ? 30 : 10 }
          ]}>
            <View style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              marginBottom: 10
            }}>
              <TouchableOpacity onPress={onPressSeeMore}>
                <Text>
                  See All Reminder
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPressCloseSlider}>
                <Text>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
            {children}
          </View>
        </View>
      )}
    </SlidingUpPanel>
  )
}

const styles = StyleSheet.create({
  listSchedulesContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1,
    paddingTop: 20,
    marginBottom: -10
  },
  dragHandler: {
    alignSelf: 'stretch',
    height: 64,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dragHandlerWrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomColor: '#d2dae2',
    borderBottomWidth: 0.5
  },
  contentContainer: {
    width: '100%',
    backgroundColor: '#fff',
    height: Platform.OS === 'ios' ? '100%' : '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})