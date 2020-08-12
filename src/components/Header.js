import React from "react"
import {
  View,
  Text,
  StyleSheet,
  Platform
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function Header({ deviceHeight }) {
  return (
    <View
      style={[
        styles.container,
        {
          height: Platform.OS === 'ios' ? deviceHeight * 1/9 : deviceHeight * 1/14
        }
      ]}
    >
      <Text style={styles.text}>
        This is Header
      </Text>
      <Icon name="comments" size={30} color="#900" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#05c46b',
    justifyContent: 'flex-end',
    paddingBottom: 20,
    paddingHorizontal: 10
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontFamily: "Poppins-Black"
  }
})