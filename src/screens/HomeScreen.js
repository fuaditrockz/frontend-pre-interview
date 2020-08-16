import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { RootContext } from '../context'
import { StatusBar } from '../components/atoms'
import {
  SchedulesList,
  SetReminderForm,
  SlidingPanel
} from '../components/organisms'

export default class HomeScreen extends React.Component {
  static contextType = RootContext

  componentDidMount() {
    this.context.changeCurrentScreenName(this.props.route.name)
  }

  render() {
    console.log(this.props.route)
    console.log(this.context)
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