import React from 'react'

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

    this.onSliderPanelFull = this.onSliderPanelFull.bind(this)
    this.onSliderPanelDown = this.onSliderPanelDown.bind(this)
    this.saveFlight = this.saveFlight.bind(this)
    this.changeCurrentScreenName = this.changeCurrentScreenName.bind(this)
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
    console.log(state.theme.statusBar)
    return (
      <RootContext.Provider
        value={{
          ...state,
          onSliderPanelFull: this.onSliderPanelFull,
          onSliderPanelDown: this.onSliderPanelDown,
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