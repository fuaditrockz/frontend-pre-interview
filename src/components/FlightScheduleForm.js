import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'

import { Input, Button } from './atoms'

export default function FlightScheduleForm({}) {
  const [flightNumber, setFlightNumber] = useState('')
  const [flightDate, setFlightDate] = useState(new Date())

  const onChangeFlightNumber = flNumber => {
    console.log('SET FLIGHT NUMBER', flNumber)
    setFlightNumber(flNumber)
  }

  const onChangeFlightDate = (date) => {
    console.log('SET FLIGHT DATE', date)
    setFlightDate(date)
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
        onChangeValue={onChangeFlightNumber}
      >
        <FontAwesomeIcon name="passport" size={15} color='#fff' />
      </Input>
      <Input
        placeholder='Eg; Dec 20, 2020'
        label='Date'
        type='input-date'
        inputValue={flightDate}
        onChangeValue={onChangeFlightDate}
      >
        <MaterialIcon name="date-range" size={15} color='#fff' />
      </Input>
      <Button
        title='SET REMINDER'
        isHaveIcon
        iconName='notifications'
        onPressButton={() => console.log('TEST')}
        isDisabled={true}
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