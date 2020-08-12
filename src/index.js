import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import { NativeRouter, Route } from 'react-router-native'

import { RootContextProvider, RootContextConsumer } from './context'
import SetupFlighScheduleScreen  from './screens/SetupFlightScheduleScreen'

export default function App() {
  return (
    <NativeRouter>
      <RootContextProvider>
        <View style={styles.container}>
          <RootContextConsumer>
            {context => (
              <StatusBar
                backgroundColor={context.theme.backgroundColor}
                barStyle={context.theme.statusBar}
              />
            )}
          </RootContextConsumer>

          <Route exact path="/" component={SetupFlighScheduleScreen} />
          {/* <Route path="/about" component={About} />
          <Route path="/topics" component={Topics} /> */}
        </View>
      </RootContextProvider>
    </NativeRouter>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3c40c6',
    alignItems: 'center',
    justifyContent: 'center',
  },
})