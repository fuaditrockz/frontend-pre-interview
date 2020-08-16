import React from 'react'
import {
  TouchableHighlight,
  Text,
  StyleSheet
} from 'react-native'

export default function TextLink({
  title,
  onPressText,
  colorType,
  size,
  isDisabled
}) {
  const getTextColor = () => {
    switch (colorType) {
      case 'warning':
        return styles.warningTextColor
      case 'reguar':
        return styles.regularTextColor
      default:
        return styles.regularTextColor
    }
  }

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return {
          fontSize: 14
        }
      case 'medium':
        return {
          fontSize: 16
        }
      case 'big':
        return {
          fontSize: 18
        }    
      default:
        return {
          fontSize: 16
        }
    }
  }

  return (
    <TouchableHighlight
      onPress={onPressText}
      underlayColor='none'
      activeOpacity={0.50}
      disabled={isDisabled}
    >
      <Text style={[
        styles.text,
        getTextColor(),
        getTextSize()
      ]}>
        {title}
      </Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins-Bold'
  },
  warningTextColor: {
    color: '#ff5e57'
  },
  regularTextColor: {
    color: '#808e9b'
  }
})