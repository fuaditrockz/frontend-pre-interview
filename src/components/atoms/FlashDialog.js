import React from 'react'
import {
  Modal as RNModal,
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableHighlight
} from 'react-native'

const { height, width } = Dimensions.get('window')

export default function FlashDialog({
  isFlashVisible,
  title,
  color,
  description
}) {
  const getColor = () => {
    switch (color) {
      case 'warning':
        return '#f53b57'
      case 'success':
        return '#05c46b'
      default:
        return '#485460'
    }
  }

  return (
    <RNModal
      animationType='fade'
      visible={isFlashVisible}
      transparent={true}
    >
      <View style={styles.centeredView}>
        <View style={styles.flashView}>
          <Text style={[
            styles.title,
            {
              color: getColor()
            }
          ]}>
            {title}
          </Text>
          <Text>
            {description}
          </Text>
        </View>
      </View>
    </RNModal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    height : 100,
    width,
    position: 'absolute',
    top: Platform.OS === 'ios' ? -22 : -20,
    flex: 1,
    alignItems: "center",
    marginTop: 10
  },
  flashView: {
    minHeight: 60,
    width: '95%',
    margin: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginBottom: -5
  }
})