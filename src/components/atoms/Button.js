import React from 'react'
import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

export default function Button({
  title,
  onPressButton,
  isHaveIcon,
  iconName,
  isDisabled
}) {
  return (
    <TouchableHighlight
      onPress={onPressButton}
      underlayColor='none'
      activeOpacity={0.50}
      disabled={isDisabled}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: isDisabled ?  '#808e9b' :  '#0fbcf9' }
        ]}
      >
        {isHaveIcon && (
          <View style={styles.icon}>
            <MaterialIcon name={iconName} size={20} color="#fff" />
          </View>
        )}
        <Text style={styles.text}>
          {title}
        </Text>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  text: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    letterSpacing: 2
  },
  icon: {
    position: 'relative',
    top: -2,
    marginRight: 5
  }
})