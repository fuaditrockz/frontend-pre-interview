import React from 'react'

import airlines from '../../assets/data/airlines.json'

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

    this.onSliderChange = this.onSliderChange.bind(this)
    this.saveFlight = this.saveFlight.bind(this)
    this.changeCurrentScreenName = this.changeCurrentScreenName.bind(this)
  }

  onSliderChange(themeContent) {
    this.setState({
      theme: {
        statusBar: themeContent === 'full' ? 'dark-content' : 'light-content',
        backgroundColor: themeContent === 'full' ? '#fff' : '#3c40c6',
        panelFullMode: !this.state.theme.panelFullMode
      }
    })
  }

  changeCurrentScreenName(scrName) {
    this.setState({
      currentScreen: scrName
    })
  }

  saveFlight(flight) {
    const { savedFlights } = this.state
    this.setState({
      savedFlights: [...savedFlights, flight]
    })
  }

  render() {
    const { state } = this
    console.log(state.theme.backgroundColor)
    console.log(state.savedFlights)
    console.log(state.theme.panelFullMode)
    return (
      <RootContext.Provider
        value={{
          ...state,
          onSliderChange: this.onSliderChange,
          saveFlight: this.saveFlight,
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