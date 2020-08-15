import React, { useState, useContext, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import airlinesJSON from '../../../assets/data//airlines.json'

import { formatDate } from '../../helpers'
import { RootContext } from '../../context'
import { Input, Button, Modal } from '../atoms'

const todayDate = new Date()

export default function FlightScheduleForm({}) {
  const { savedFlights, saveFlight } = useContext(RootContext)

  // INPUT STATE
  const [inputFLNumber, setInputFLNumber] = useState('')
  const [inputFLDate, setInputFLDate] = useState(new Date())
  const [airlineCode, setAirlineCode] = useState('')

  // VENDOR DATA
  const [flightAPIData, setFlightAPIData] = useState([])
  const [airlines] = useState(JSON.parse(JSON.stringify(airlinesJSON)).data)

  // FINAL DATA
  const [finalFlightDetails, setFinalFlightDetails] = useState()
  const [finalAirlineDetails, setFinalAirlineDetails] = useState()

  // UTILITIES
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchFlightAPIData = async () => {
      const stateDate = formatDate(inputFLDate.toDateString())
      const today = formatDate(todayDate.toDateString())
      const url = `https://www.hongkongairport.com/flightinfo-rest/rest/flights/past?date=${stateDate}&lang=en&cargo=false&arrival=false`

      try {
        const response = await fetch(url)
        const data = await response.json()

        if (stateDate === today) {
          console.log(data)
          setFlightAPIData(data[1].list)
          matchingLocalFLNumberToFLAPIData(data[1].list)
        } else {
          console.log(data)
          setFlightAPIData(data[0].list)
          matchingLocalFLNumberToFLAPIData(data[0].list)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchFlightAPIData()
  }, [inputFLDate])

  useEffect(() => {
    matchingLocalFLNumberToFLAPIData(flightAPIData)
  }, [inputFLNumber, inputFLDate])

  useEffect(() => {
    matchingAirlineCodeToAirlinesAPI(airlineCode)
  }, [airlineCode])

  const matchingLocalFLNumberToFLAPIData = data => {
    setFinalFlightDetails(null)
    const fetchedData = data
    console.log('matchingLocalFLNumberToFLAPIData', fetchedData)
    const matchedData = fetchedData.filter((item) => {
      item.flight.map((fl, index) => {
        /* console.log(index, fl) */
        if (fl.no === inputFLNumber) {
          setFinalFlightDetails(item)
          setAirlineCode(fl.airline)
        }
      })
    })
    console.log('matchedData', matchedData)
    return matchedData
  }

  const matchingAirlineCodeToAirlinesAPI = code => {
    setFinalAirlineDetails(null)
    const matchedData = airlines.filter(arl => {
      return arl.icao_code == code
    })
    setFinalAirlineDetails(matchedData)
  }

  const onChangeFlightNumberInput = flNumber => {
    setInputFLNumber(flNumber)
    setFinalFlightDetails(null)
  }

  const onChangeFlightDateInput = (date) => {
    setInputFLDate(date)
  }

  const eraseAllStateValues = () => {
    setInputFLDate(new Date())
    setInputFLNumber('')
  }

  const setReminder = () => {
    if (!finalFlightDetails) {
      setIsError(true)
    } else {
      saveFlight({
        flightNumber: inputFLNumber,
        flightDate: inputFLDate,
        ...finalFlightDetails,
        airlineDetails: {...finalAirlineDetails[0]},
        isActive: true
      })
      eraseAllStateValues()
    }
  }

  console.log(savedFlights)

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>
          Set Flight Reminder
        </Text>
      </View>
      <Input
        placeholder='Eg; Dec 20, 2020'
        label='Date'
        type='input-date'
        inputValue={inputFLDate}
        onChangeValue={onChangeFlightDateInput}
      >
        <MaterialIcon name="date-range" size={15} color='#fff' />
      </Input>
      <Input
        placeholder='Eg; JA 8890'
        label='Flight Number'
        inputValue={inputFLNumber}
        onChangeValue={onChangeFlightNumberInput}
        isDisabled={!flightAPIData}
      >
        <FontAwesomeIcon name="passport" size={15} color='#fff' />
      </Input>
      <Button
        title='SET REMINDER'
        isHaveIcon
        iconName='notifications'
        onPressButton={setReminder}
        isDisabled={!inputFLNumber ? true : false}
      />
      <Modal
        isModalVisible={isError}
        onPressClose={() => setIsError(false)}
      >
         <Image
          style={{
            width: 200,
            height: 200
          }}
          source={require('../../../assets/404.gif')}
        />
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.notFoundDialog}>
            We're sorry, flight number {inputFLNumber} not found.
          </Text>
        </View>
      </Modal>
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
  },
  notFoundDialog: {
    fontFamily: 'Poppins-Medium',
    marginBottom: 20,
    fontSize: 14,
    textAlign: 'center'
  }
})