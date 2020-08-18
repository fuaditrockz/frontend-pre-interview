import React from 'react'
import { AsyncStorage } from 'react-native'

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
      currentScreen: ''
    }

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
      subText: flight.flightNumber
    })
    this.notificationService.getScheduledLocalNotifications(n => {
      console.log('GET ID LAST NOTIF SET', n)
    })
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
  }

  render() {
    const { state } = this
    console.log(state.theme.backgroundColor)
    console.log(state.savedFlights)
    console.log(state.theme.statusBar)
    return (
      <RootContext.Provider
        value={{
          ...state,
          onSliderPanelFull: this.onSliderPanelFull,
          onSliderPanelDown: this.onSliderPanelDown,
          saveFlight: this.saveFlight,
          removeFlight: this.removeFlight,
          changeCurrentScreenName: this.changeCurrentScreenName
        }}
      >
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