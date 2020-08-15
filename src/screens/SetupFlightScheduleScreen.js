import React from 'react'
import {
  View,
  StyleSheet,
  Dimensions
} from 'react-native'

import {
  SchedulesList,
  FlightScheduleForm,
  SetReminderForm,
  Header,
  SlidingPanel
} from '../components/organisms'

const { height } = Dimensions.get('window')

export default class SetupFlightScheduleScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header deviceHeight={height} />
        <View style={styles.body}>
          {/* <FlightScheduleForm /> */}
          <SetReminderForm />
        </View>
        <SlidingPanel>
          <SchedulesList />
        </SlidingPanel>
      </View>
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
  },
  listSchedulesContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1
  },
  dragHandler: {
    alignSelf: 'stretch',
    height: 64,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollView: {
    width: '100%',
    paddingHorizontal: 10
  }
})