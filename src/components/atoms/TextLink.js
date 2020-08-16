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
  isDisabled
}) {
  const getColorStyle = () => {
    switch (colorType) {
      case 'warning':
        return styles.warningTextColor
      case 'reguar':
        return styles.regularTextColor
      default:
        return styles.regularTextColor
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
        getColorStyle()
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