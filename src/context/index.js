import React from 'react'
import {
  AsyncStorage,
  Platform
} from 'react-native'
import FlashMessage from 'react-native-flash-message'
import { FlashDialog } from '../components/atoms'

import NotificationService from '../services/NotificationService'
import { amPmConvert } from '../helpers'

export const RootContext = React.createContext()

export class RootContextProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      theme: {
        statusBar: 'light-content',
        backgroundColor: '#3c40c6',
        panelFullMode: false
      },
      savedFlights: [],
      currentScreen: '',
      flashMessage: {
        isShow: false,
        status: 'idle'
      }
    }

    this.flashMessageRef = React.createRef().current
    this.notificationService = new NotificationService()
    this.onSliderPanelFull = this.onSliderPanelFull.bind(this)
    this.onSliderPanelDown = this.onSliderPanelDown.bind(this)
    this.saveFlight = this.saveFlight.bind(this)
    this.removeFlight = this.removeFlight.bind(this)
    this.changeCurrentScreenName = this.changeCurrentScreenName.bind(this)
  }

  componentDidMount() {
    /* AsyncStorage.removeItem('savedFlights') */
    AsyncStorage.getItem('savedFlights', (err, res) => {
      if (res) {
        console.log('LOCAL STORAGE', JSON.parse(res))
        JSON.parse(res).map((data) => {
          data.flightDate = new Date(data.flightDate)
          this.setState({
            savedFlights: [ ...this.state.savedFlights, data ]
          })
        })
      } else {
        console.log(err)
      }
    })
  }

  onSliderPanelFull() {
    this.setState({
      theme: {
        statusBar: 'dark-content',
        backgroundColor: '#fff',
        panelFullMode: true
      }
    })
  }

  onSliderPanelDown() {
    this.setState({
      theme: {
        statusBar: 'light-content',
        backgroundColor: '#3c40c6',
        panelFullMode: false
      }
    })
  }

  changeCurrentScreenName(scrName) {
    this.setState({
      currentScreen: scrName
    })
  }

  closeFlashDialog() {
    setTimeout(() => {
      this.setState({
        flashMessage: {
          isShow: false,
          status: 'idle'
        }
      })
    }, 800);
  }

  async saveFlight(flight) {
    const { savedFlights } = this.state
    this.setState({
      savedFlights: [...savedFlights, flight]
    })
    await AsyncStorage.getItem('savedFlights')
    .then((flights) => {
      const fl = flights ? JSON.parse(flights) : [];
      fl.flightDate && fl.flightDate.toString()
      fl.push(flight);
      AsyncStorage.setItem('savedFlights', JSON.stringify(fl));
    })

    this.notificationService.scheduleNotif({
      id: flight.notificationId,
      title: 'Flight Reminder',
      description: `${flight.airlineDetails.airline_name} with flight number  ${flight.flighNumber} will flight today at ${amPmConvert(flight.time)} to ${flight.flightDestination.name}.`,
      message: `Reminder for flight number: ${flight.flightNumber}`,
      subText: flight.flightNumber,
      forDate: new Date(flight.flightDate)
    })

    this.notificationService.getScheduledLocalNotifications(n => {
      console.log('GET ID LAST NOTIF SET', n)
    })

    if (Platform.OS === 'ios') {
      this.refs.rootFlash.showMessage({
        message: 'Reminder Added',
        description: `Reminder for ${flight.flightNumber} has been set.`,
        type: "default",
        backgroundColor: "#05c46b",
        color: "#fff"
      })
    } else {
      this.setState({
        flashMessage: {
          isShow: true,
          status: 'success'
        }
      })
    }

    this.closeFlashDialog()
  }

  removeFlight(id, notifId) {
    const { savedFlights } = this.state
    this.setState({
      savedFlights: savedFlights.filter(flight => {
        return flight.id !== id
      })
    })
    AsyncStorage.getItem('savedFlights')
      .then((flights) => {
        if (flights) {
          const localStorageData = JSON.parse(flights)
          const flightIndex = localStorageData.findIndex(x => x.id === id)
          localStorageData.splice(flightIndex, 1)
          AsyncStorage.setItem('savedFlights', JSON.stringify(localStorageData))
        }
      })

    this.notificationService.cancelNotif(notifId)
    this.notificationService.getScheduledLocalNotifications(n => {
      console.log('GET ID LAST NOTIF SET', n)
    })

    if (Platform.OS === 'ios') {
      this.refs.rootFlash.showMessage({
        message: 'Reminder deleted',
        description: `Reminder has been deleted.`,
        type: "default",
        backgroundColor: "#f53b57",
        color: "#fff"
      })
    } else {
      this.setState({
        flashMessage: {
          isShow: true,
          status: 'warning'
        }
      })
    }

    this.closeFlashDialog()
  }

  render() {
    const { flashMessage: { status, isShow }, theme, savedFlights } = this.state
    console.log(theme.backgroundColor)
    console.log(savedFlights)
    console.log(theme.statusBar)
    
    console.log('FLASH', this.refs)
    return (
      <RootContext.Provider
        value={{
          ...this.state,
          onSliderPanelFull: this.onSliderPanelFull,
          onSliderPanelDown: this.onSliderPanelDown,
          saveFlight: this.saveFlight,
          removeFlight: this.removeFlight,
          changeCurrentScreenName: this.changeCurrentScreenName
        }}
      >
        {Platform.OS === 'ios' ? (
          <FlashMessage ref='rootFlash' position="top" />
        ) : (
          <FlashDialog
            isFlashVisible={isShow}
            title={status === 'success' ? 'Reminder Added' : 'Reminder deleted.'}
            description={status === 'success' ? 'Reminder for has been set' : 'Reminder has been deleted.'}
            color={status}
          />
        )}
        {this.props.children}
      </RootContext.Provider>
    )
  }
}

export class RootContextConsumer extends React.Component {
  render() {
    return (
      <RootContext.Consumer>
        {this.props.children}
      </RootContext.Consumer>
    )
  }
}