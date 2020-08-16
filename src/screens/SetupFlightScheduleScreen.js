import React from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { RootContextConsumer } from '../context'
import {
  SchedulesList,
  SetReminderForm,
  Header,
  SlidingPanel
} from '../components/organisms'

const { height } = Dimensions.get('window')

export default class SetupFlightScheduleScreen extends React.Component {
  render() {
    return (
      <LinearGradient colors={['#3c40c6', '#575fcf']} style={styles.container}>
        <RootContextConsumer>
          {context => (
            <StatusBar
              backgroundColor={context.theme.backgroundColor}
              barStyle={context.theme.statusBar}
            />
          )}
        </RootContextConsumer>
        <View style={styles.container}>
          <Header deviceHeight={height} />
          <View style={styles.body}>
            <SetReminderForm />
          </View>
          <SlidingPanel>
            <SchedulesList />
          </SlidingPanel>
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