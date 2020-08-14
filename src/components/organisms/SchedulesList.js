import React, { useContext } from 'react'
import {
  StyleSheet,
  ScrollView
} from 'react-native'

import { RootContext } from '../../context'
import { FlightCard } from '../molecules'

export default function ScheduleList() {
  const { savedFlights } = useContext(RootContext)
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