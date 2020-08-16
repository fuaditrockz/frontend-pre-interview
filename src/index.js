import React from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

import { RootContextProvider } from './context'

import SetupFlighScheduleScreen from './screens/SetupFlightScheduleScreen'
import ShowReminderDetails from './screens/ShowReminderDetails'

export default function App() {
  return (
    <NavigationContainer>
      <RootContextProvider>
        <Stack.Navigator
          initialRouteName='SetupFlightSchedule'
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name='SetupFlightSchedule' component={SetupFlighScheduleScreen} />
        </Stack.Navigator>
      </RootContextProvider>
    </NavigationContainer>
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