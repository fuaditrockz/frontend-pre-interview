import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

export default function DetailsCard({
  data,
  flightNumber,
  airlineName,
  isPassed,
  isHaveHeader,
  headerColor
}) {
  const renderHeader = () => {
    return (
      <View style={[
        styles.cardHeader,
        {
          backgroundColor: headerColor
        }
      ]}>
        <View>
          <Text style={[styles.title, styles.fontWhite]}>
            #{flightNumber}
          </Text>
          <Text style={[styles.regularText, styles.fontWhite]}>
            {airlineName}
          </Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center'  }}>
          {isPassed === 1 ? (
            <MaterialIcon name="flight-land" size={30} color='#fff' />
          ) : (
            <MaterialIcon name="flight" size={30} color='#fff' />
          )}
          <Text style={[ styles.miniText, styles.fontDim ]}>
            {isPassed === -1 ? 'Standby' : 'Has Landed'}
          </Text>
        </View>
      </View>
    )
  }

  const renderAllContents = () => {
    return data.map((d, index) => (
      <View style={styles.content} key={index}>
        <Text style={styles.labelText}>{d.label}</Text>
        <Text style={styles.regularText}>{d.content}</Text>
      </View>
    ))
  }

  return (
    <View style={styles.card}>
      {isHaveHeader && renderHeader()}
      <View style={styles.body}>
        {renderAllContents()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    minHeight: 100,
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 0.65,
    elevation: 7,
    marginBottom: 10
  },
  cardHeader: {
    width: '100%',
    minHeight: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  body: {
    flexWrap: 'wrap',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  content: {
    marginBottom: 10,
    width: '50%'
  },
  fontWhite: {
    color: '#fff'
  },
  fontDim: {
    color: '#d2dae2'
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 30,
    marginBottom: -10
  },
  regularText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14
  },
  miniText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12
  },
  labelText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    marginBottom: -5,
    color: '#1e272e'
  }
})