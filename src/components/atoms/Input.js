import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Keyboard,
  TextInput,
  StyleSheet,
  Animated,
  Platform
} from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker"

const emptyLabelPosition = {
  x: Platform.OS === 'ios' ? 0 : 5,
  y: Platform.OS === 'ios' ? 10 : 20
}

const filledLabelPosition =  {
  x: Platform.OS === 'ios' ? -20 : -20,
  y: Platform.OS === 'ios' ? -15 : -5  
}

export default function Input({
  inputValue,
  onChangeValue,
  placeholder,
  label,
  type,
  children
}) {
  const typeInputIsDate = type === 'input-date'

  const [isInputActive, setIsInputActive] = useState(
    typeInputIsDate ? true : false
  )
  const [calendarVisible, setCalendarVisible] = useState(false)

  const labelPositionRef = useRef(new Animated.ValueXY(
    typeInputIsDate ? filledLabelPosition : emptyLabelPosition
  )).current
  const labelFontSizeRef = useRef(new Animated.Value(
    typeInputIsDate ? 0.8 : 1
  )).current
  
  const animatedMoveLabel = (statusPosition) => {
    const statusPositionIsMove = statusPosition === 'move'
    Animated.parallel([
      Animated.timing(labelPositionRef, {
        toValue: statusPositionIsMove ? filledLabelPosition : emptyLabelPosition,
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(labelFontSizeRef, {
        toValue: statusPositionIsMove ? 0.8 : 1,
        duration: 300,
        useNativeDriver: true
      })
    ]).start()
  }

  const activateInput = () => {
    animatedMoveLabel('move')
    setIsInputActive(true)
    if (typeInputIsDate) {
      setCalendarVisible(true)
      Keyboard.dismiss()
    }
  }

  const onEndEditing = e => {
    if (!e.nativeEvent.text) {
      setIsInputActive(false)
      animatedMoveLabel('back')
    }
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          minWidth: 200,
          position: 'absolute',
          transform: [
            { translateX: labelPositionRef.x },
            { translateY: labelPositionRef.y }
          ]
        }}
      >
        <Animated.Text style={[ styles.label, { transform: [{ scale: labelFontSizeRef }] }]}>
          {label}
        </Animated.Text>
      </Animated.View>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeValue}
        value={typeInputIsDate ? inputValue.toDateString() : inputValue}
        placeholder={!isInputActive ? '' : placeholder}
        placeholderTextColor='#C5CEE1'
        onFocus={activateInput}
        onEndEditing={onEndEditing}
      />
      {isInputActive && (
        <View style={styles.icon}>
          {children}
        </View>
      )}
      {typeInputIsDate && (
        <DateTimePickerModal
          isVisible={calendarVisible}
          mode="date"
          value={inputValue}
          onConfirm={date => {
            onChangeValue(date)
            setCalendarVisible(false)
          }}
          onCancel={() => setCalendarVisible(!calendarVisible)}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Platform.OS === 'ios' ? 25 : 20
  },
  textInput: {
    height: Platform.OS === 'ios' ? 40 : 50,
    borderColor: '#d2dae2',
    borderBottomWidth: 0.5,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    paddingStart: 25,
    paddingBottom: -15,
    color: '#fff'
  },
  label: {
    color: '#d2dae2',
    fontFamily: 'Poppins-Bold'
  },
  icon: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 12 : 20
  }
})