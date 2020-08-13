import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TextInput, StyleSheet, Animated, Platform } from 'react-native'

export default function Input({ placeholder, label, onChangeText, ref }) {
  const [isInputActive, setIsInputActive] = useState(false)
  const labelPositionRef = useRef(new Animated.ValueXY(
    {
      x: Platform.OS === 'ios' ? 0 : 5,
      y: Platform.OS === 'ios' ? 10 : 20
    }
  )).current
  const labelFontSizeRef = useRef(new Animated.Value(1)).current
  
  const moveLabel = (statusPosition) => {
    Animated.parallel([
      Animated.timing(labelPositionRef, {
        toValue: statusPosition === 'move' ? (
          {
            x: Platform.OS === 'ios' ? -10 : -6,
            y: Platform.OS === 'ios' ? -10 : -5  
          }
        ) : (
          {
            x: Platform.OS === 'ios' ? 0 : 5,
            y: Platform.OS === 'ios' ? 10 : 20 
          }
        ),
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(labelFontSizeRef, {
        toValue: statusPosition === 'move' ? 0.8 : 1,
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
    marginBottom: Platform.OS === 'ios' ? 20 : 15
  },
  textInput: {
    height: Platform.OS === 'ios' ? 40 : 50,
    borderColor: '#d2dae2',
    borderBottomWidth: 0.5,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    paddingBottom: -15,
    color: '#fff'
  },
  label: {
    color: '#d2dae2',
    fontFamily: 'Poppins-Bold'
  }
})