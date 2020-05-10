import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import styles from './HomeScreen.styles';
import { Button, Container } from 'native-base';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import {
    updateHemisphere,
    updateInGameTime
  } from "../Redux/CollectionActions";
import { AppLoading } from 'expo';

export interface HomeScreenProps {
    navigation: NavigationScreenProp<any>,
    updateInGameTime: typeof updateInGameTime,
    updateHemisphere: typeof updateHemisphere,          
}

class HomeScreen extends Component<HomeScreenProps, {isReady: boolean}>{
    constructor(props: HomeScreenProps){
        super(props);
        this.state = {
            isReady: false
        }
    }
    async componentDidMount(){
        //Setup user settings
        const inGameTime = await AsyncStorage.getItem('InGameTimeOffSet');
        if(inGameTime){
            //Ingame time is an offset...
            this.props.updateInGameTime(JSON.parse(inGameTime));
        }
        else{
            //default
            this.props.updateInGameTime({minutes: 0});
        }

        const isNorthernHemisphere = await AsyncStorage.getItem('IsNorthernHemisphere');
        if(isNorthernHemisphere !== null){
            this.props.updateHemisphere(JSON.parse(isNorthernHemisphere));
        }
        else{
            //default
            this.props.updateHemisphere(true);
        }
        this.setState({isReady: true});
    }
    
    render(){
        if(!this.state.isReady){
            return <AppLoading></AppLoading>
        }
        else{
            return (
                <Container style={styles.container}>
                    <Button onPress={() => this.props.navigation.navigate("Fish")} style={styles.fishButtonStyle}>
                        <Text style={styles.fishButtonTextStyle}>{"Fish"}</Text>
                    </Button>
                    <Button onPress={() => this.props.navigation.navigate("Bugs")} style={styles.bugButtonStyle}>
                        <Text style={styles.fishButtonTextStyle}>{"Bugs"}</Text>
                    </Button>
                    <Button onPress={() => {this.props.navigation.navigate("Fossils")}} style={styles.fossilsButtonStyle}>
                        <Text  style={styles.fishButtonTextStyle}>{"Fossils"}</Text>
                    </Button>
                    <Button onPress={() => {this.props.navigation.navigate("Artwork")}} style={styles.artworkButtonStyle}>
                        <Text  style={styles.fishButtonTextStyle}>{"Artwork"}</Text>
                    </Button>
                    <Button onPress={() => {this.props.navigation.navigate("Settings")}} style={styles.settingsButtonStyle}>
                        <Text style={styles.fishButtonTextStyle}>{"Settings"}</Text>
                    </Button>
                </Container>
            );
        }
        
    }
}

const mapStateToProps = (state: any) => {
    const { appState } = state;
    return { appState };
  };

export default connect(mapStateToProps, {
    updateInGameTime,
    updateHemisphere
  })(HomeScreen);
