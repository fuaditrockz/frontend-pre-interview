import React from 'react'
import {
  View,
  Platform,
  StyleSheet,
  Dimensions
} from 'react-native'
import SlidingUpPanel from 'rn-sliding-up-panel'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import { RootContextConsumer } from '../context'
import { SchedulesList, FlightScheduleForm, Header } from '../components/organisms'

const { height } = Dimensions.get('window')

export default class SetupFlightScheduleScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isPanelFull: false
    }
  }

  onSlidePanel(posValue, changeStatusBar) {
    const { isPanelFull } = this.state

    if (posValue === height) {
      changeStatusBar('light-content')
      this.setState({
        isPanelFull: !isPanelFull
      }) 
    } else if (posValue === (Platform.OS === 'ios' ? 400 : 300)) {
      changeStatusBar('dark-content')
      this.setState({
        isPanelFull: !isPanelFull
      }) 
    }
  }

  renderSlidingUpPanel() {
    const { isPanelFull } = this.state
    return (
      <RootContextConsumer>
        {context => (
          <SlidingUpPanel
            ref={c => this._panel = c}
            draggableRange={{top: height, bottom: Platform.OS === 'ios' ? 400 : 300}}
            onDragEnd={value => this.onSlidePanel(value, context.changeStatusBarTheme)}
          >
            {dragHandler => (
              <View style={styles.listSchedulesContainer}>
                <View style={styles.dragHandler} {...dragHandler}>
                  <MaterialIcon
                    name={`keyboard-arrow-${isPanelFull ? 'down' : 'up'}`}
                    size={25}
                    color='#485460'
                  />
                </View>
                <SchedulesList />
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
    paddingHorizontal: 10
  }
})