import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TextInput, StyleSheet, Animated } from 'react-native'

export default function Input({ placeholder, label, onChangeText, ref }) {
  const [isInputActive, setIsInputActive] = useState(false)
  const labelTopRef = useRef(new Animated.Value(10)).current
  const labelLeftRef = useRef(new Animated.Value(10)).current
  const labelFontSizeRef = useRef(new Animated.Value(14)).current
  
  const moveLabel = (statusPosition) => {
    Animated.parallel([
      Animated.timing(labelTopRef, {
        toValue: statusPosition === 'move' ? -10 : 10,
        duration: 300
      }),
      Animated.timing(labelLeftRef, {
        toValue: statusPosition === 'move' ? 0 : 10,
        duration: 300
      }),
      Animated.timing(labelFontSizeRef, {
        toValue: statusPosition === 'move' ? 10 : 14,
        duration: 300
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
          top: labelTopRef,
          left: labelLeftRef
        }}
      >
        <Animated.Text style={[ styles.label, { fontSize: labelFontSizeRef }]}>
          {label}
        </Animated.Text>
      </Animated.View>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeText}
        /* value={100} */
        placeholder={!isInputActive ? '' : placeholder}
        placeholderTextColor='#d2dae2'
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
    paddingHorizontal: 10,
    color: '#fff'
  },
  label: {
    color: '#d2dae2',
    fontFamily: 'Poppins-Medium'
  }
})