import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import { checkIndexIsEven } from '../../helpers'

export default function FlightCard({
  flightNumber,
  flightDate,
  time,
  isNotificationActive,
  isPassed,
  index
}) {
  const renderLeft = () => {
    return (
      <View style={styles.iconLeft}>
        <MaterialIcon
          name={`notifications-${isNotificationActive && isPassed === -1 ? 'active' : 'paused'}`}
          size={20}
          color={isNotificationActive ? '#fff' : '#d2dae2'}
        />
      </View>
    )
  }

  const renderCenter = () => {
    return (
      <View style={styles.content}>
        <Text
          style={styles.flightNumber}
        >
          {flightNumber}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.flightDate}>
            {time}, {flightDate}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            {isPassed === 1 && (
              <MaterialIcon
                name="check-circle"
                size={12}
                color='#fff'
                style={{ position: 'relative', top: 3 }}
              />
            )}
            <Text style={[styles.flightDate, { marginStart: 3 }]}>
              {isPassed === -1 ? 'Standby' : 'Has Landed'}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  const renderRight = () => {
    return (
      <View style={[styles.iconRight, styles.divider]}>
        {isPassed === 1 ? (
          <MaterialIcon name="flight-land" size={25} color='#fff' />
        ) : (
          <MaterialIcon name="flight" size={25} color='#fff' />
        )}
      </View>
    )
  }
  return (
    <TouchableOpacity
      style={[
        styles.flightView,
        {backgroundColor: checkIndexIsEven(index) ? (
          isPassed === 1 ? 'rgba(72, 84, 96, 0.7)' : '#ef5777'
        ) : (
          isPassed === 1 ? 'rgba(128, 142, 155, 0.9)'  : '#575fcf'
        )}
      ]}
      activeOpacity={0.8}
    >
      <>
        {renderLeft()}
        {renderCenter()}
        {renderRight()}
      </>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  flightView: {
    width: '100%',
    height: 70,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    flexDirection: 'row'
  },
  content: {
    width: '78%',
    paddingStart: 5,
    paddingEnd: 15
  },
  iconRight: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '15%',
    height: '100%',
  },
  iconLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '10%',
    height: '100%',
  },
  flightNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#fff',
    letterSpacing: 1,
    marginBottom: Platform.OS === 'ios' ? 0 : -5
  },
  flightDate: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#d2dae2'
  },
  divider: {
    borderLeftColor: '#FFF',
    borderLeftWidth: 0.5
  }
})