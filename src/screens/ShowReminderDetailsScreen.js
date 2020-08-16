import React from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { StatusBar } from '../components/atoms'

export default class ShowReminderDetailsScreen extends React.Component {
  render() {
    return (
      <LinearGradient
        start={{x: 0.0, y: 0.85}}
        end={{x: 0.5, y: 1.0}}
        locations={[0.08, 1]}
        colors={['#6C75F4', '#626CFF']}
        style={styles.container}
      >
        <StatusBar />
        <View style={styles.container}>
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