import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native'

export default function ButtonRounded({
  title,
  onPressButton,
  color,
  isDisabled
}) {
  const getButtonColor = () => {
    switch (color) {
      case 'warning':
        return '#ff5e57'
      case 'regular':
        return '#575fcf'
      default:
        return '#575fcf'
    }
  }

  return (
    <TouchableOpacity
      onPress={onPressButton}
      style={[
        styles.button,
        { backgroundColor: getButtonColor() }
      ]}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 50
  },
  text: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: 18
  }
})