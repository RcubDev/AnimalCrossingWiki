import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FishScreen from './FishScreen/FishScreen';
import FossilScreen from './FossilScreen/FossilScreen';
import BugScreen from './BugScreen/BugScreen';
import HomeScreen from './HomeScreen/HomeScreen';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Container, Button, Text, Content, Footer } from 'native-base';
import { Header } from 'react-native/Libraries/NewAppScreen';

export default class App extends React.Component<any, { isReady: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    const Stack = createStackNavigator();

    return (
      <Container>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Fish" component={FishScreen} />
              <Stack.Screen name="Fossils" component={FossilScreen} />
              <Stack.Screen name="Bugs" component={BugScreen} />
            </Stack.Navigator>
        </NavigationContainer>
      </Container>

    );

  }
}