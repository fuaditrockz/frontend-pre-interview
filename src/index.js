import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NativeRouter, Route, Link } from "react-router-native";

import SetupFlighScheduleScreen  from './screens/SetupFlightScheduleScreen'

export default function App() {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <Route exact path="/" component={SetupFlighScheduleScreen} />
        {/* <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} /> */}
      </View>
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