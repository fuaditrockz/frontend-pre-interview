import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import Input from './Input'

export default function FlightScheduleForm({}) {
  const [flightNumber, setFlightNumber] = useState('')

  const onChangeText = e => {
    console.log(e)
    setFlightNumber(e)
  }

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>
          Set Flight Reminder
        </Text>
      </View>
      <Input
        placeholder='Eg; JA 8890'
        label='Flight Number'
        inputValue={flightNumber}
        onChangeValue={onChangeText}
      />
      <Input
        placeholder='Dec 20, 2020'
        label='Date'
        type='input-date'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 20
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    color: '#fff'
  },
  textInput: {
    height: 40,
    borderColor: '#d2dae2',
    borderBottomWidth: 0.5,
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: 10,
    color: '#fff'
  }
})