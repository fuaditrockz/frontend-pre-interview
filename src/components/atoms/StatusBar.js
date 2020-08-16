import React from 'react'
import { StatusBar as RNStatusBar } from 'react-native'

import { RootContextConsumer } from '../../context'

export default function StatusBar() {
  return (
    <RootContextConsumer>
      {context => (
        <RNStatusBar
          backgroundColor={context.theme.backgroundColor}
          barStyle={context.theme.statusBar}
        />
      )}
    </RootContextConsumer>
  )
}