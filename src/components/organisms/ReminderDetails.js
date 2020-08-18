import React from 'react'
import {
  StyleSheet,
  ScrollView
} from 'react-native'

import { amPmConvert, checkIndexIsEven } from '../../helpers'
import { DetailsCard } from '../molecules'

export default function ReminderDetails({
  data
}) {
  const getHeaderColor = () => {
    return checkIndexIsEven(data.index) ? (
      data.isPassed === 1 ? 'rgba(72, 84, 96, 1)' : '#ef5777'
    ) : (
      data.isPassed === 1 ? 'rgba(128, 142, 155, 1)'  : '#575fcf'
    )
  }

  const renderMainDetails = () => {
    let setupData = []
    setupData.push(
      {
        label: 'Date',
        content: data.flightDate.toDateString()
      },
      {
        label: 'Time',
        content: amPmConvert(data.time)
      },
      {
        label: 'Destination',
        content: data.destination[0]
      },
      {
        label: 'Status',
        content: data.status
      },
      {
        label: 'Status Code',
        content: data.statusCode
      }
    )
    return (
      <DetailsCard
        data={setupData}
        isHaveHeader
        flightNumber={data.flightNumber}
        airlineName={data.airlineDetails.airline_name}
        isPassed={data.isPassed}
        headerColor={getHeaderColor()}
      />
    )
  }

  const renderLocationDetails = () => {
    let setupData = []
    setupData.push(
      {
        label: 'Location',
        content: 'HK Int Airport'
      },
      {
        label: 'Terminal',
        content: data.terminal
      },
      {
        label: 'Gate',
        content: data.gate
      },
      {
        label: 'Aisle',
        content: data.aisle
      }
    )
    return (
      <DetailsCard data={setupData} />
    )
  }

  const renderAirlineDetails = () => {
    let setupData = []
    setupData.push(
      {
        label: 'Airline Name',
        content: data.airlineDetails.airline_name
      },
      {
        label: 'Country',
        content: data.airlineDetails.country_name
      },
      {
        label: 'Call Sign',
        content: data.airlineDetails.callsign
      },
      {
        label: 'ICAO',
        content: data.airlineDetails.icao_code
      }
    )
    return (
      <DetailsCard data={setupData} />
    )
  }

  const renderDestinationsDetails = () => {
    let allDestinations = []
    allDestinations.push({
      iata: 'HKG',
      name: 'Hong Kong - International Airport',
      street1: '1 Sky Plaza Rd, Chek Lap Kok, Hong Kong',
      city: 'Chek Lap Kok',
      countryName: 'Hong Kong',
      countryCode: 'HKG'
    }, data.flightDestination)
    console.log('ALL DESTINATIONS', allDestinations)
    return (
      <DetailsCard
        data={allDestinations}
        isDestinationsCard
        headerColor={getHeaderColor()}
      />
    )
  }

  return (
    <ScrollView style={styles.container}>
      {renderMainDetails()}
      {renderDestinationsDetails()}
      {renderLocationDetails()}
      {renderAirlineDetails()}
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 10
  }
})