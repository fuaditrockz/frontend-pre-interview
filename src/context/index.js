import React from 'react'
import { Platform } from 'react-native'
const RootContext = React.createContext()

export class RootContextProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      theme: {
        statusBar: 'light-content',
        backgroundColor: '#3c40c6'
      }
    }

    this.changeStatusBarTheme = this.changeStatusBarTheme.bind(this)
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

  render() {
    const { state } = this
    console.log(state.theme.backgroundColor)
    return (
      <RootContext.Provider
        value={{
          ...state,
          changeStatusBarTheme: this.changeStatusBarTheme
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