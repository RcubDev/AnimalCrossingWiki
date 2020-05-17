import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FishScreen from './FishScreen/FishScreen';
import BugScreen from './BugScreen/BugScreen';
import HomeScreen from './HomeScreen/HomeScreen';
import SettingsScreen from './SettingsScreen/SettingsScreen';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Container } from 'native-base';
import FishDetails from './FishScreen/FishDetail/FishDetailScreen';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import BugDetailScreen from './BugScreen/BugDetail/BugDetailScreen';
import FossilScreen from './FossilScreen/FossilScreen'
import FossilDetailScreen from './FossilScreen/FossilDetail/FossilDetailScreen';
import ArtworkScreen from './ArtScreen/ArtworkScreen';
import ArtworkDetailScreen from './ArtScreen/ArtDetails/ArtworkDetailScreen';
import CollectionReducer from './ReduxV2/CollectionReducer';
import KKSongsScreen from './KKSongsScreen/KKSongsScreen';

const storeV2 = createStore(CollectionReducer)
const fetchFonts = () => {
  return Font.loadAsync({
    'comfortaa-regular': require('./assets/fonts/Comfortaa-Regular.ttf'),
  });
};



export default class App extends Component<any, { isReady: boolean }> {
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
      Confortaa: require('./assets/fonts/Comfortaa-Regular.ttf'),
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
      <Provider store={storeV2}>
        <Container>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: true }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Fish" component={FishScreen} />
              <Stack.Screen name="Bugs" component={BugScreen} />
              <Stack.Screen name="BugDetails" component={BugDetailScreen} />
              <Stack.Screen name="FishDetails" component={FishDetails} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
              <Stack.Screen name="Fossils" component={FossilScreen} />
              <Stack.Screen name="FossilDetails" component={FossilDetailScreen} />
              <Stack.Screen name="Artwork" component={ArtworkScreen} />
              <Stack.Screen name="ArtworkDetails" component={ArtworkDetailScreen} />
              <Stack.Screen name="KKSongs" component={KKSongsScreen}/>
            </Stack.Navigator>
          </NavigationContainer>
        </Container>
      </Provider>

    );

  }
}