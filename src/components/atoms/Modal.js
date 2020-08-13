import React from 'react'
import {
  Modal as RNModal,
  View,
  Button,
  StyleSheet
} from 'react-native'

export default function Modal({
  children,
  isModalVisible,
  onPressClose
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
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {children}
          <Button
            onPress={onPressClose}
            title="Close"
          />
        </View>
      </View>
    </RNModal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
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
  }
})