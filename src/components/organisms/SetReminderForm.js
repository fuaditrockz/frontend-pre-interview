import React, { useState, useContext, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Keyboard
} from 'react-native'
import { showMessage } from 'react-native-flash-message'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import shortid from 'shortid'

import NotificationService from '../../services/NotificationService'
import {
  PromiseKit,
  getHKAirportData,
  getAirlineData,
  getDestinationData,
  dates
} from '../../helpers'
import { RootContext } from '../../context'
import { Input, Button, Modal } from '../atoms'

const today = new Date()

export default function SetReminderForm({}) {
  const { savedFlights, saveFlight } = useContext(RootContext)
  const notification = new NotificationService(
    null,
    notif => setRemoteNotification(notif)
  )

  // INPUT STATE
  const [inputFLNumber, setInputFLNumber] = useState('')
  const [inputFLDate, setInputFLDate] = useState(new Date())

  // UTILITIES
  const [isError, setIsError] = useState(false)
  const [isDataExist, setIsDataExist] = useState(false)
  const [remoteNotification, setRemoteNotification] = useState()

  useEffect(() => {
    // Get Cloud messenger notification
    typeof remoteNotification === 'object' && notification.localNotif({
      title: remoteNotification.title,
      description: remoteNotification.data.description,
      message: remoteNotification.message,
      soundName: remoteNotification.sound
    })

    return () => console.log(`Notification ${typeof remoteNotification === 'object' && remoteNotification.id} has been send.`)
  }, [remoteNotification])

  const saveReminder = PromiseKit({
    data: {
      inputFLNumber,
      inputFLDate
    },
    errorMessage: 'Has no flight number or flight date'
  })

  const onPressSetReminder = () => {
    saveReminder
      .then(async res => {
        const HKAirportData = await getHKAirportData(res.inputFLDate)
        let fixedData

        HKAirportData.filter((item) => {
          item.flight.map((fl,index) => {
            if (fl.no === res.inputFLNumber) {
              console.log(item.destination)
              fixedData = {
                flightNumber: res.inputFLNumber,
                flightDate: res.inputFLDate,
                ...item,
                airlineCode: fl.airline
              }
            }
          })
        })

        if (fixedData) {
          const sameFlightNumber = savedFlights.some(fl => fl.flightNumber === res.inputFLNumber)
          const sameFlightDate = savedFlights.some(fl => dates.compare(fl.flightDate, res.inputFLDate) === 0)
          console.log('FIXED DATA', `${sameFlightDate} - ${sameFlightNumber}`)
          if (sameFlightNumber && sameFlightDate) {
            setIsDataExist(true)
            throw new Error('Flight number has been added on the list.')
          } else {
            delete Object.assign(fixedData, {['anotherFlights']: fixedData['flight'] })['flight']

            const thisAirlineIndex = fixedData.anotherFlights.findIndex(arl => arl.no === res.inputFLNumber)
            console.log(thisAirlineIndex)
            if (thisAirlineIndex > -1) {
              fixedData.anotherFlights.splice(thisAirlineIndex, 1) 
            } 
          }
        } else {
          setIsError(true)
          throw new Error('Flight number not found')
        }

        return fixedData
      })
      .then(res => {
        console.log('SUCCESS - HK AIRPORT DATA', res)
        let fixedData
        if (res) {
          const airlineData = getAirlineData(res.airlineCode)
          fixedData = {
            ...res,
            airlineDetails: {...airlineData[0]}
          }
          return fixedData 
        }
      })
      .then(async res => {
        console.log('SUCCESS - AIRLINE DATA', res)
        let fixedData = {
          ...res
        }

        try {
          await getDestinationData(res.destination[0]).then(d => {
            fixedData.flightDestination = { ...d }
          })
  
          return fixedData
        } catch (error) {
          console.log(error)
        }
      })
      .then(res => {
        console.log('SUCCESS - DESTINATION DATA', res)
        saveFlight({
          id: shortid.generate(),
          notificationId: Math.floor(Math.random() * 10000) + 1,
          isActive: dates.compare(today, res.flightDate) === -1 ? true : false,
          ...res
        })
        eraseAllStateValues()
        showMessage({
          message: "Simple message",
          type: "info",
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  const onChangeFlightNumberInput = flNumber => {
    setInputFLNumber(flNumber)
  }

  const onChangeFlightDateInput = (date) => {
    setInputFLDate(date)
  }

  const eraseAllStateValues = () => {
    setInputFLDate(new Date())
    setInputFLNumber('')
    Keyboard.dismiss()
  }

  const renderModal = () => {
    if (isError) {
      return (
        <Modal
          isModalVisible={isError}
          onPressClose={() => setIsError(false)}
          isModalViewBlur
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
      )
    } else if (isDataExist) {
      return (
        <Modal
          isModalVisible={isDataExist}
          onPressClose={() => setIsDataExist(false)}
        >
          <Image
            style={{
              width: 250,
              height: 200,
              borderRadius: 20
            }}
            source={require('../../../assets/exist.gif')}
          />
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={styles.notFoundDialog}>
              Flight number {inputFLNumber} has been set.
            </Text>
          </View>
        </Modal>
      )
    } else {
      return null
    }
  }

  console.log('ALL SAVED DATA', savedFlights)
  return (
    <View style={styles.container}>
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
      >
        <FontAwesomeIcon name="passport" size={15} color='#fff' />
      </Input>
      <Button
        title='SET REMINDER'
        isHaveIcon
        iconName='notifications'
        onPressButton={onPressSetReminder}
        isDisabled={!inputFLNumber ? true : false}
      />
      {renderModal()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20
  },
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