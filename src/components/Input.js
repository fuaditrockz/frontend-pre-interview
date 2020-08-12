import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

export default function Input({ placeholder, onChangeText }) {
  return (
    <View>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeText}
        /* value={100} */
        placeholder={placeholder}
        placeholderTextColor='#d2dae2'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: '#d2dae2',
    borderBottomWidth: 0.5,
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: 10,
    color: '#fff'
  }
})