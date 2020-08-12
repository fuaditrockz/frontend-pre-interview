import React from 'react'
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native'
import SlidingUpPanel from 'rn-sliding-up-panel'

import { FlightScheduleForm, Header } from '../components'

const { height } = Dimensions.get('window')

export default class SetupFlightScheduleScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header deviceHeight={height} />
        <FlightScheduleForm />
        <Button title='Show panel' onPress={() => this._panel.show()} />
        <SlidingUpPanel
          ref={c => this._panel = c}
          draggableRange={{top: height, bottom: 400}}
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
    width: '100%'
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