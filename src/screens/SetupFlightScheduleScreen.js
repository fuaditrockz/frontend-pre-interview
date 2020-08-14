import React from 'react'
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Dimensions,
  ScrollView
} from 'react-native'
import SlidingUpPanel from 'rn-sliding-up-panel'

import { RootContextConsumer } from '../context'

import { SavedFlightCard } from '../components/atoms'
import FlightScheduleForm from '../components/FlightScheduleForm'
import Header from '../components/Header'

const { height } = Dimensions.get('window')

export default class SetupFlightScheduleScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  onSlidePanel(changeStatusBar) {
    changeStatusBar()
  }

  renderAllSavedFlights(flights) {
    return flights.map((flight, index) => {
      return (
        <SavedFlightCard
          key={index}
          flightNumber={flight.flightNumber}
          flightDate={flight.flightDate.toDateString()}
        />
      )
    })
  }

  renderSlidingUpPanel() {
    return (
      <RootContextConsumer>
        {context => (
          <SlidingUpPanel
            ref={c => this._panel = c}
            draggableRange={{top: height, bottom: Platform.OS === 'ios' ? 400 : 300}}
            onDragEnd={value => this.onSlidePanel(context.changeStatusBarTheme)}
          >
            {dragHandler => (
              <View style={styles.listSchedulesContainer}>
                <View style={styles.dragHandler} {...dragHandler}>
                  <Text>Drag handler</Text>
                </View>
                <ScrollView style={styles.scrollView}>
                  {this.renderAllSavedFlights(context.savedFlights)}
                </ScrollView>
              </View>
            )}
          </SlidingUpPanel>
        )}
      </RootContextConsumer>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Header deviceHeight={height} />
        <View style={styles.body}>
          <FlightScheduleForm />
        </View>
        {this.renderSlidingUpPanel()}
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
    paddingHorizontal: 20
  }
})