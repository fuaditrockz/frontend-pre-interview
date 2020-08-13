import React from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

export default function Button({
  title,
  onPressButton,
  isHaveIcon,
  iconName
}) {
  return (
    <TouchableOpacity
      onPress={onPressButton}
    >
      <View style={styles.container}>
        {isHaveIcon && (
          <View style={styles.icon}>
            <MaterialIcon name={iconName} size={20} color="#fff" />
          </View>
        )}
        <Text style={styles.text}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0fbcf9',
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