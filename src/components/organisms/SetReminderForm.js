import React, { useState, useContext, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator
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
  const [airlines] = useState(JSON.parse(JSON.stringify(airlinesJSON)).data)
  const [flightNumber, setFlightNumber] = useState('')
  const [flightAirline, setFlightAirline] = useState('')
  const [flightDate, setFlightDate] = useState(new Date())
  const [isError, setIsError] = useState(false)

  const [flightAPIData, setFlightAPIData] = useState([])
  const [finalData, setFinalData] = useState({
    flightDetails: null
  })
  const [fetchStatus, setFetchStatus] = useState('idle')

  useEffect(() => {
    const fetchFlightAPIData = async () => {
      const stateDate = formatDate(flightDate.toDateString())
      const today = formatDate(todayDate.toDateString())
      const url = `https://www.hongkongairport.com/flightinfo-rest/rest/flights/past?date=${stateDate}&lang=en&cargo=false&arrival=false`

      try {
        console.log('fetching')
        setFetchStatus('fetching')
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

        setTimeout(() => {
          console.log('idle')
          setFetchStatus('idle')
        }, 800)
      } catch (error) {
        console.log(error)
      }
    }

    fetchFlightAPIData()
  }, [flightDate])

  useEffect(() => {
    matchingLocalFLNumberToFLAPIData(flightAPIData)
  }, [flightNumber, flightDate])

  const matchingLocalFLNumberToFLAPIData = data => {
    setFinalData({
      flightDetails: null
    })
    const fetchedData = data
    console.log('matchingLocalFLNumberToFLAPIData', fetchedData)
    const matchedData = fetchedData.filter((item) => {
      item.flight.map((fl, index) => {
        /* console.log(index, fl) */
        if (fl.no === flightNumber) {
          setFinalData({
            flightDetails: item
          })
          setFlightAirline(fl.airline)
        }
      })
    })
    console.log('matchedData', matchedData)
    return matchedData
  }

  const onChangeFlightNumber = flNumber => {
    setFlightNumber(flNumber)
    setFinalData({
      flightDetails: null
    })
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
    let testDataMatched = []

    try {
      const response = await fetch(url)
      const data = await response.json()

      await data[0].list.filter((item) => {
        item.flight.map((fl, index) => {
          console.log(index, fl)
          if (fl.no === flightNumber) {
            testDataMatched.push(item)
            setFlightAirline(fl.airline)
          }
        })
      })

      const airlineData = airlines.filter(arl => {
        return arl.icao_code == flightAirline
      })

      console.log('getDataFromFlightAPI', data[0].list)
      console.log('matchedData', testDataMatched)
      console.log('airlineData', airlineData)

      if (testDataMatched.length === 0) {
        setIsError(true)
      } else {
        saveFlight({
          ...testDataMatched[0],
          airlineDetails: {
            name: airlineData[0].airline_name,
            country: airlineData[0].country_name,
            fleetSize: airlineData[0].fleet_size,
            fleetAverageAge: airlineData[0].fleet_average_age,
            callSign: airlineData[0].callsign
          },
          flightNumber,
          flightDate,
          isActive: true
        })
      }
    }
    catch (err) {
      return console.log(err)
    }
  }

  const setReminder = () => {
    matchLocalStateToTheAPI(flightDate)
    eraseAllStateValues()
  }

  const renderModalResponse = status => {
    switch (status) {
      case 'idle':
        return (
          <Text style={styles.responseText}>Idle</Text>
        )
      case 'fetching':
        return (
          <>
            <ActivityIndicator size="small" color="#3c40c6" />
            <Text style={[styles.responseText, { marginTop: 20 }]}>Fetching data...</Text>
          </>
        )
      default:
        return (
          <Text style={styles.responseText}>Idle</Text>
        )
    }
  }

  const modalResponseVisibilityStatus = () => {
    switch (fetchStatus) {
      case 'idle':
        return false
      case 'fetching':
        return true
      default:
        return false
    }
  }

  console.log('finalData', finalData.flightDetails && finalData.flightDetails.flight)
  console.log('airlineCode', flightAirline)

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
        inputValue={flightDate}
        onChangeValue={onChangeFlightDate}
      >
        <MaterialIcon name="date-range" size={15} color='#fff' />
      </Input>
      <Input
        placeholder='Eg; JA 8890'
        label='Flight Number'
        inputValue={flightNumber}
        onChangeValue={onChangeFlightNumber}
        isDisabled={!flightAPIData}
      >
        <FontAwesomeIcon name="passport" size={15} color='#fff' />
      </Input>
      <Button
        title='SET REMINDER'
        isHaveIcon
        iconName='notifications'
        onPressButton={setReminder}
        isDisabled={false}
      />
      <Modal
        isModalVisible={modalResponseVisibilityStatus()}
        isModalWithoutCloser
      >
        <View style={styles.responseModalContainer}>
          {renderModalResponse(fetchStatus)}
        </View>
      </Modal>
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
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={styles.notFoundDialog}>
            We're sorry, flight number {flightNumber} not found.
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
  },
  responseModalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 'auto',
    flex: 1
  },
  responseText: {
    fontFamily: 'Poppins-Medium',
    color: '#485460',
    fontSize: 16
  }
})