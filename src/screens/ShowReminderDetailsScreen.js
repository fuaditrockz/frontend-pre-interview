import React from 'react'
import {
  View,
  StyleSheet,
  Dimensions
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { StatusBar } from '../components/atoms'
import {
  Header
} from '../components/organisms'

const { height } = Dimensions.get('window')

export default class ShowReminderDetailsScreen extends React.Component {
  render() {
    return (
      <LinearGradient colors={['#3c40c6', '#575fcf']} style={styles.container}>
        <StatusBar />
        <View style={styles.container}>
          <Header deviceHeight={height} />
          <View style={styles.body}>
            
          </View>
        </View>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  body: {
    paddingHorizontal: 20
  }
})