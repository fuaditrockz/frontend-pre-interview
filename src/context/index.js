import React from 'react'

import airlines from '../../assets/data/airlines.json'

export const RootContext = React.createContext()

export class RootContextProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      theme: {
        statusBar: 'light-content',
        backgroundColor: '#3c40c6'
      },
      savedFlights: []
    }

    this.changeStatusBarTheme = this.changeStatusBarTheme.bind(this)
    this.saveFlight = this.saveFlight.bind(this)
  }

  changeStatusBarTheme(themeContent) {
    this.setState({
      theme: {
        statusBar: themeContent === 'light-content' ? 'dark-content' : 'light-content',
        backgroundColor: themeContent === 'light-content' ? '#fff' : '#3c40c6'
      }
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
    return (
      <RootContext.Provider
        value={{
          ...state,
          changeStatusBarTheme: this.changeStatusBarTheme,
          saveFlight: this.saveFlight
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