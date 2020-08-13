import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

export default function SavedFlightCard({
  flightNumber,
  flightDate
}) {
  return (
    <View style={styles.flightView}>
      <Text>{flightNumber}</Text>
      <Text>{flightDate}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  flightView: {
    width: '100%',
    marginBottom: 10,
    borderColor: '#d2dae2',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5
  }
})