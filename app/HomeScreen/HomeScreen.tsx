import React, { Component } from 'react';
import { Text, View, AsyncStorage, ImageBackground } from 'react-native';
import styles from './HomeScreen.styles';
import { Button, Container, Icon, Thumbnail } from 'native-base';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import { updateInGameTime, updateHemisphere } from '../ReduxV2/CollectionActions';

export interface HomeScreenProps {
    navigation: NavigationScreenProp<any>,   
    updateInGameTime: typeof updateInGameTime,
    updateHemisphere: typeof updateHemisphere
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
            this.props.updateInGameTime(0);
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
                    <ImageBackground source={require('../Images/Other/animalcrossingWallpaperFinal.png')}style={styles.container}>
                    <Button onPress={() => this.props.navigation.navigate("Fish")} style={[styles.buttonStyle, {backgroundColor: '#ffadad'}]}>
                        <Text style={styles.textStyle}>{"Fishing"}</Text>
                        <Thumbnail large source={require('../Images/Other/fishingIcon.png')} ></Thumbnail>
                    </Button>
                    <Button onPress={() => this.props.navigation.navigate("Bugs")} style={[styles.buttonStyle, {backgroundColor: '#ffd6a5'}]}>
                        <Text style={styles.textStyle}>{"Bugs"}</Text>
                        <Icon type="FontAwesome5" name="bug" style={{color: 'black'}}/>
                    </Button>
                    <Button onPress={() => {this.props.navigation.navigate("Fossils")}} style={[styles.buttonStyle, {backgroundColor: '#fdffb6'}]}>
                        <Text style={styles.textStyle}>{"Fossils"}</Text>
                        <Icon type="FontAwesome5" name="bone" style={{color: 'black'}}/>
                    </Button>
                    <Button onPress={() => {this.props.navigation.navigate("Artwork")}} style={[styles.buttonStyle, {backgroundColor: '#caffbf'}]}>
                        <Text style={styles.textStyle}>{"Artwork"}</Text>
                        <Icon type="FontAwesome5" name="paint-brush" style={{color: 'black'}}/>
                    </Button>
                    <Button onPress={() => {this.props.navigation.navigate("KKSongs")}} style={[styles.buttonStyle, {backgroundColor: '#9bf6ff'}]}>
                        <Text style={styles.textStyle}>{"Music"}</Text>
                        <Icon type="FontAwesome5" name="music" style={{color: 'black'}}/>
                    </Button>
                    <Button onPress={() => {this.props.navigation.navigate("Reactions")}} style={[styles.buttonStyle, {backgroundColor: '#a0c4ff'}]}>
                        <Text style={styles.textStyle}>{"Reactions"}</Text>
                        <Icon type="FontAwesome5" name="smile" style={{color: 'black'}}/>
                    </Button>
                    <Button onPress={() => {this.props.navigation.navigate("VillagersCategory")}} style={[styles.buttonStyle, {backgroundColor: '#bdb2ff'}]}>
                        <Text style={styles.textStyle}>{"Villagers"}</Text>
                        <Icon type="FontAwesome5" name="male" style={{color: 'black'}}/>
                    </Button>
                    <Button onPress={() => {this.props.navigation.navigate("Settings")}} style={[styles.buttonStyle, {backgroundColor: '#8900f2'}]}>
                        <Text style={styles.textStyle}>{"Settings"}</Text>
                        <Icon type="FontAwesome" name="gear" style={{color: 'black'}}/>
                    </Button>
                    </ImageBackground>
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
