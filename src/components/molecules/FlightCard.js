import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

export default function FlightCard({
  flightNumber,
  flightDate,
  isNotificationActive,
  index
}) {

  function checkIndexIsEven (n) {
    return n % 2 == 0;
  }

  return (
    <View
      style={[
        styles.flightView,
        {
          backgroundColor: checkIndexIsEven(index) ? '#575fcf' : '#ef5777'
        }
      ]}
    >
      <View style={styles.icon}>
        <MaterialIcon name="flight" size={25} color='#fff' />
      </View>
      <View style={styles.content}>
        <Text
          style={styles.flightNumber}
        >
          {flightNumber}
        </Text>
        <Text
          style={styles.flightDate}
        >
          {flightDate}
        </Text>
      </View>
      <View style={styles.icon}>
        <MaterialIcon
          name={`notifications-${isNotificationActive ? 'active' : 'paused'}`}
          size={20}
          color={isNotificationActive ? '#fff' : '#d2dae2'} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  flightView: {
    width: '100%',
    height: 70,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: 'row'
  },
  content: {
    width: '72%'
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '12%',
    height: '100%',
    marginEnd: 10
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
  }
})