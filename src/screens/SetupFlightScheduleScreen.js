import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import SlidingUpPanel from 'rn-sliding-up-panel'

import { FlightScheduleForm  } from '../components'

export default class SetupFlightScheduleScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlightScheduleForm />
        <Button title='Show panel' onPress={() => this._panel.show()} />
        <SlidingUpPanel
          ref={c => this._panel = c}
          onDragStart={(value, gestureState) => {
            console.log(value)
          }}
        >
          <View style={styles.listSchedulesContainer}>
            <Text>Here is the content inside panel</Text>
            <Button title='Hide' onPress={() => this._panel.hide()} />
          </View>
        </SlidingUpPanel>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listSchedulesContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})