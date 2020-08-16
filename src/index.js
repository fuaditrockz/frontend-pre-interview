import React from 'react'
import { Dimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

import { RootContextProvider } from './context'
import { Header } from './components/organisms'
import SetupFlighScheduleScreen from './screens/SetupFlightScheduleScreen'
import ShowReminderDetailsScreen from './screens/ShowReminderDetailsScreen'
import { SafeAreaView } from 'react-native-safe-area-context'

const { height } = Dimensions.get('window')

export default function App() {
  return (
    <NavigationContainer>
      <RootContextProvider>
        <Header deviceHeight={height} />
        <Stack.Navigator
          initialRouteName='SetupFlightSchedule'
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen
            name='SetupFlightSchedule'
            component={SetupFlighScheduleScreen}
          />
          <Stack.Screen name='ShowReminderDetails' component={ShowReminderDetailsScreen} />
        </Stack.Navigator>
      </RootContextProvider>
    </NavigationContainer>
  )
}