import React, { Component } from 'react';
import { Text, View, AsyncStorage, ImageBackground, Image } from 'react-native';
import styles from './HomeScreen.styles';
import { Container, Icon, Thumbnail } from 'native-base';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import { updateInGameTime, updateHemisphere } from '../ReduxV2/CollectionActions';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';


export interface HomeScreenProps {
    navigation: NavigationScreenProp<any>,
    updateInGameTime: typeof updateInGameTime,
    updateHemisphere: typeof updateHemisphere
}

class HomeScreen extends Component<HomeScreenProps, { isReady: boolean }>{
    constructor(props: HomeScreenProps) {
        super(props);
        this.state = {
            isReady: false
        }
    }
    async componentDidMount() {
        //Setup user settings
        const inGameTime = await AsyncStorage.getItem('InGameTimeOffSet');
        if (inGameTime) {
            //Ingame time is an offset...
            this.props.updateInGameTime(JSON.parse(inGameTime));
        }
        else {
            //default
            this.props.updateInGameTime(0);
        }

        const isNorthernHemisphere = await AsyncStorage.getItem('IsNorthernHemisphere');
        if (isNorthernHemisphere !== null) {
            this.props.updateHemisphere(JSON.parse(isNorthernHemisphere));
        }
        else {
            //default
            this.props.updateHemisphere(true);
        }
        this.setState({ isReady: true });
    }

    render() {
        if (!this.state.isReady) {
            return <AppLoading></AppLoading>
        }
        else {
            return (
                <ScrollView>
                    <Container style={styles.container}>
                        <ImageBackground source={require('../Images/Other/HomePageBackground.png')} style={styles.container}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Fish")} style={[styles.buttonStyle, { backgroundColor: '#ffadad' }]}>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={styles.textStyle}>{"Fish"}</Text>
                                    <Image source={{ uri: 'https://acnhcdn.com/latest/MenuIcon/Fish48.png' }} style={{ width: 75, height: 75 }}></Image>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Bugs")} style={[styles.buttonStyle, { backgroundColor: '#ffd6a5' }]}>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={styles.textStyle}>{"Bugs"}</Text>
                                    <Image source={{ uri: 'https://acnhcdn.com/latest/MenuIcon/Ins0.png' }} style={{ width: 75, height: 75 }}></Image>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("Fossils") }} style={[styles.buttonStyle, { backgroundColor: '#fdffb6' }]}>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={styles.textStyle}>{"Fossils"}</Text>
                                    <Image source={{ uri: 'https://acnhcdn.com/latest/MenuIcon/Fossil.png' }} style={{ width: 75, height: 75 }}></Image>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("Artwork") }} style={[styles.buttonStyle, { backgroundColor: '#caffbf' }]}>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={styles.textStyle}>{"Artwork"}</Text>
                                    <Image source={require('../Images/Other/ReddFaceImage.png')} style={{ width: 75, height: 75 }}></Image>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("KKSongs") }} style={[styles.buttonStyle, { backgroundColor: '#9bf6ff' }]}>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={styles.textStyle}>{"Music"}</Text>
                                    <Image source={{ uri: 'https://acnhcdn.com/latest/MenuIcon/Music.png' }} style={{ width: 75, height: 75 }}></Image>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("Reactions") }} style={[styles.buttonStyle, { backgroundColor: '#a0c4ff' }]}>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={styles.textStyle}>{"Reactions"}</Text>
                                    <Image source={{ uri: 'https://acnhcdn.com/latest/ManpuIcon/HappyFlower.png' }} style={{ width: 75, height: 75 }}></Image>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("VillagersCategory") }} style={[styles.buttonStyle, { backgroundColor: '#bdb2ff' }]}>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={styles.textStyle}>{"Villagers"}</Text>
                                    <Image source={{ uri: 'https://acnhcdn.com/latest/NpcIcon/pgn01.png' }} style={{ width: 75, height: 75 }}></Image>                                   
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("FurnitureCategory") }} style={[styles.buttonStyle, { backgroundColor: '#bdb2ff' }]}>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={styles.textStyle}>{"Furniture"}</Text>
                                    <Image source={{ uri: 'https://acnhcdn.com/latest/MenuIcon/Leaf.png' }} style={{ width: 75, height: 75 }}></Image>                                                                       
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("ClothingCategory") }} style={[styles.buttonStyle, { backgroundColor: '#bdb2ff' }]}>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={styles.textStyle}>{"Clothing"}</Text>
                                    <Image source={{ uri: 'https://acnhcdn.com/latest/MenuIcon/Tops.png' }} style={{ width: 75, height: 75 }}></Image>                                                                       
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("Settings") }} style={[styles.buttonStyle, { backgroundColor: '#8900f2' }]}>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={styles.textStyle}>{"Settings"}</Text>
                                    <Icon type="FontAwesome" name="gear" style={{ color: 'black' }} />
                                </View>
                            </TouchableOpacity>
                        </ImageBackground>
                    </Container>
                </ScrollView>
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
