import React from 'react'
import { Dimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

import { RootContextProvider } from './context'
import { Header } from './components/organisms'
import HomeScreen from './screens/HomeScreen'
import ShowReminderDetailsScreen from './screens/ShowReminderDetailsScreen'

const { height } = Dimensions.get('window')

export default function App() {
  return (
    <NavigationContainer>
      <RootContextProvider>
        <Header deviceHeight={height} />
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen
            name='Home'
            component={HomeScreen}
          />
          <Stack.Screen
            name='ShowReminderDetails'
            component={ShowReminderDetailsScreen}
          />
        </Stack.Navigator>
      </RootContextProvider>
    </NavigationContainer>
  )
}