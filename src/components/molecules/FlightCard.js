import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Animated
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'

import { checkIndexIsEven } from '../../helpers'

export default function FlightCard({
  flightNumber,
  flightDate,
  time,
  isNotificationActive,
  isPassed,
  index
}) {
  const navigation = useNavigation()
  const [isRenderMoreAction, setIsRenderMoreAction] = useState(false)
  const actionPosRef = useRef(new Animated.ValueXY({x: 0, y: -50})).current
  const actionDispRef = useRef(new Animated.Value(0)).current
  const containerHeightRef = useRef(new Animated.Value(70)).current

  useEffect(() => {
    animatedShowMoreAction(`${isRenderMoreAction ? 'move' : 'back'}`)
  }, [isRenderMoreAction])

  const onPressCard = async () => {
    setIsRenderMoreAction(!isRenderMoreAction)
  }

  const animatedShowMoreAction = status => {
    Animated.parallel([
      Animated.timing(actionPosRef, {
        toValue: status === 'move' ? { x: 0, y: -2 } : { x: 0, y: -50 },
        duration: Platform.OS === 'android' ? 600 : 400,
        useNativeDriver: true
      }).start(),
      Animated.timing(actionDispRef, {
        toValue: status === 'move' ? 1 : 0,
        duration: Platform.OS === 'android' ? 600 : 400,
        useNativeDriver: true
      }).start(),
      Animated.timing(containerHeightRef, {
        toValue: status === 'move' ? 110 : 70,
        duration: Platform.OS === 'android' ? 50 : 400,
        useNativeDriver: false
      }).start()
    ])
  }

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

  const renderMoreAction = () => {
    return (
      <Animated.View
        style={[
          styles.moreActionContainer,
          {
            opacity: actionDispRef,
            zIndex: -1,
            transform: [
              { translateX: actionPosRef.x },
              { translateY: actionPosRef.y }
            ]
          }
        ]}
      >
        <TouchableOpacity onPress={() => navigation.navigate('ShowReminderDetails')}>
          <Text style={[styles.actionText, styles.regularTextColor]}>
            See Details
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.actionText, styles.warningTextColor]}>
            Remove
          </Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }

  return (
    <Animated.View style={[styles.container, { height: containerHeightRef }]}>
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
        onPress={onPressCard}
      >
        <>
          {renderLeft()}
          {renderCenter()}
          {renderRight()}
        </>
      </TouchableOpacity>
      {renderMoreAction()}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  flightView: {
    width: '100%',
    height: 70,
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
  },
  moreActionContainer: {
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(210, 218, 226,1.0)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    height: 40
  },
  warningTextColor: {
    color: '#ff5e57'
  },
  regularTextColor: {
    color: '#808e9b'
  },
  actionText: {
    fontFamily: 'Poppins-Bold'
  }
})