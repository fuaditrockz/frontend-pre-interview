import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TextInput, StyleSheet, Animated } from 'react-native'

export default function Input({ placeholder, label, onChangeText, ref }) {
  const [isInputActive, setIsInputActive] = useState(false)
  const labelPositionRef = useRef(new Animated.ValueXY({ x: 10, y: 10 })).current
  const labelFontSizeRef = useRef(new Animated.Value(1)).current
  
  const moveLabel = (statusPosition) => {
    Animated.parallel([
      Animated.timing(labelPositionRef, {
        toValue: statusPosition === 'move' ? { x: 10, y: -10 } : { x: 10, y: 10 },
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(labelFontSizeRef, {
        toValue: statusPosition === 'move' ? 1 : 1,
        duration: 300,
        useNativeDriver: true
      })
    ]).start()
  }
  const activateInput = () => {
    moveLabel('move')
    setIsInputActive(true)
  }
  const onEndEditing = e => {
    if (!e.nativeEvent.text) {
      setIsInputActive(false)
      moveLabel('back')
    }
  }

  console.log(isInputActive)

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          position: 'absolute',
          transform: [{ translateX: labelPositionRef.x }, { translateY: labelPositionRef.y }]
        }}
      >
        <Animated.Text style={[ styles.label, { transform: [{ scale: labelFontSizeRef }] }]}>
          {label}
        </Animated.Text>
      </Animated.View>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeText}
        /* value={100} */
        placeholder={!isInputActive ? '' : placeholder}
        placeholderTextColor='#C5CEE1'
        onFocus={activateInput}
        onEndEditing={onEndEditing}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  textInput: {
    height: 40,
    borderColor: '#d2dae2',
    borderBottomWidth: 0.5,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingTop: 5,
    color: '#fff'
  },
  label: {
    color: '#d2dae2',
    fontFamily: 'Poppins-Bold'
  }
})