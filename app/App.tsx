import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FishScreen from './FishScreen/FishScreen';
import FossilScreen from './FossilScreen/FossilScreen';
import BugScreen from './BugScreen/BugScreen';
import HomeScreen from './HomeScreen/HomeScreen';


export default class App extends Component {

  render() {
    const Stack = createStackNavigator();

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Fish" component={FishScreen} />
          <Stack.Screen name="Fossils" component={FossilScreen} />
          <Stack.Screen name="Bugs" component={BugScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


