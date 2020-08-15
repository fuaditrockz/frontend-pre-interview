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

export default function Modal({
  children,
  isModalVisible,
  onPressClose,
  isModalWithoutCloser
}) {
  return (
    <RNModal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View
        style={[
          styles.centeredView,
          {
            backgroundColor: isModalWithoutCloser ? 'rgba(255,255,255,0.01)' : 'rgba(0, 0, 0, 0.5)'
          }
        ]}
      >
        <View style={styles.modalView}>
          {children}
          {!isModalWithoutCloser && (
            <TouchableHighlight
              onPress={onPressClose}
              underlayColor='none'
              style={styles.closeButton}
            >
              <Text style={styles.textClose}>Close</Text>
            </TouchableHighlight>
          )}
        </View>
      </View>
    </RNModal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    height,
    width,
    position: 'absolute',
    top: Platform.OS === 'ios' ? -22 : -20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    minHeight: 200,
    width: '80%',
    margin: 20,
    backgroundColor: "#f7f7f7",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  closeButton: {
    width: '100%',
    backgroundColor: '#f53b57',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  textClose: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: 16
  }
})