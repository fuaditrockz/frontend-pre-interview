import React, { useState, useContext } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'

import { formatDate } from '../helpers'
import { RootContext, RootContextConsumer } from '../context'
import { Input, Button } from './atoms'

export default function FlightScheduleForm({}) {
  const { airlines, saveFlight } = useContext(RootContext)
  const [flightNumber, setFlightNumber] = useState('')
  const [flightDate, setFlightDate] = useState(new Date())

  const onChangeFlightNumber = flNumber => {
    setFlightNumber(flNumber)
  }

  const onChangeFlightDate = (date) => {
    setFlightDate(date)
  }

  const eraseAllStateValues = () => {
    setFlightDate(new Date())
    setFlightNumber('')
  }

  const matchLocalStateToTheAPI = async date => {
    const url = `https://www.hongkongairport.com/flightinfo-rest/rest/flights/past?date=${formatDate(date.toDateString())}&lang=en&cargo=false&arrival=false`

    try {
      const response = await fetch(url)
      const data = await response.json()
      const matchedData = await data[0].list.filter((item) => {
        const flNumberIndex = item.flight.map(fl => fl.no).indexOf(flightNumber)
        return !flNumberIndex
      })
      console.log('getDataFromFlightAPI', data[0].list)
      return matchedData
    }
    catch (err) {
      return console.log(err)
    }
  }

  const setReminder = async () => {
    try {
      const fixedData = await matchLocalStateToTheAPI(flightDate)
      saveFlight({
        ...fixedData[0],
        flightNumber,
        flightDate,
        isActive: true
      })
      eraseAllStateValues()
    } catch (err) {
      console.log(err)
    }
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
        onPressButton={setReminder}
        isDisabled={false}
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