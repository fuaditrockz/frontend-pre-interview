import React from 'react'
import { View, Text, Platform, StyleSheet, Dimensions } from 'react-native'
import SlidingUpPanel from 'rn-sliding-up-panel'

import { RootContextConsumer  } from '../context'

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

  renderSlidingUpPanel() {
    return (
      <RootContextConsumer>
        {context => (
          <SlidingUpPanel
            ref={c => this._panel = c}
            draggableRange={{top: height, bottom: Platform.OS === 'ios' ? 400 : 300}}
            onDragEnd={value => this.onSlidePanel(context.changeStatusBarTheme)}
          >
            <View style={styles.listSchedulesContainer}>
              <Text>Here is the content inside panel</Text>
            </View>
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
    borderTopRightRadius: 20
  }
})