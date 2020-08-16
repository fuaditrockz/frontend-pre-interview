import React, { useContext } from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  Platform
} from 'react-native'
import Empty from '../../../assets/icons/empty.svg'

import { dates, amPmConvert } from '../../helpers'

import { RootContext } from '../../context'
import { FlightCard } from '../molecules'

const today = new Date()
const { height } = Dimensions.get('window')

export default function ScheduleList() {
  const { savedFlights, theme: { panelFullMode } } = useContext(RootContext)
  if (savedFlights.length === 0) {
    return (
      <View style={{
        width: '100%',
        height: height - (panelFullMode ? 100 : (Platform.OS === 'ios' ? 60 : 90)),
        paddingVertical: 30,
        alignItems: 'center'
      }}>
        <Empty height={150} width={150} />
        <Text style={{
          fontFamily: 'Poppins-Bold',
          fontSize: 16,
          color: '#485460'
        }}>
          You don't have any set.
        </Text>
      </View>
    )
  }
  return (
    <ScrollView style={styles.scrollView}>
      {savedFlights.map((flight, index) => {
          return (
            <FlightCard
              index={index}
              key={index}
              flightNumber={flight.flightNumber}
              flightDate={flight.flightDate.toDateString()}
              isNotificationActive={flight.isActive}
              isPassed={dates.compare(today, flight.flightDate)}
              time={amPmConvert(flight.time)}
            />
          )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    paddingHorizontal: 10
  }
})