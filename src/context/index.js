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
      savedFlights: [],
      airlines: []
    }

    this.changeStatusBarTheme = this.changeStatusBarTheme.bind(this)
    this.saveFlight = this.saveFlight.bind(this)
  }

  async UNSAFE_componentWillMount() {
    const airlinesData = airlines
    const convertedJSONData = await JSON.parse(JSON.stringify(airlinesData))
    this.setState({
      airlines: [convertedJSONData]
    })
  }

  changeStatusBarTheme() {
    const { statusBar, backgroundColor } = this.state.theme
    this.setState({
      theme: {
        statusBar: statusBar === 'light-content' ? 'dark-content' : 'light-content',
        backgroundColor: backgroundColor === '#3c40c6' ? '#fff' : '#3c40c6'
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
    console.log(state.airlines)
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