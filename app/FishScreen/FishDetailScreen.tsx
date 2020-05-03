import React, { Component } from 'react';
import { Container, Button, Text, Header, Content, Footer, View, H1, CardItem, Card, CheckBox } from 'native-base';
import { Image } from 'react-native';
import FishImages from '../Images/FishImages';
import { connect } from 'react-redux';
import { updateFishCaught, updateFishDonated } from '../Redux/CollectionActions';
import { NavigationScreenProp } from 'react-navigation';
import { NewFishModel } from '../../models/CollectionModels/NewFishModel';
import { ApplicationState } from '../../models/ApplicationState';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './FishDetailScreenStyles';

interface FishDetailsProps {
    navigation: NavigationScreenProp<any>,
    collections: ApplicationState
    updateFishCaught: typeof updateFishCaught
    updateFishDonated: typeof updateFishDonated
    route: {
        key: string,
        name: string,
        params: {
            index: number,
            fish: NewFishModel
        }   
    }
}

interface FishDetailsState {
    model: NewFishModel
}



class FishDetails extends Component<FishDetailsProps, FishDetailsState> {
    index = this.props.route.params.index;
    fish = this.props.collections.fish.fishCollection[this.index];
    SetItemCaught = (caught: boolean, index: number) => {
        this.props.updateFishCaught({caught, index});
        this.setState({model: this.props.collections.fish.fishCollection[index]});
    }


    SetItemDonated = (donated: boolean, index: number) => {
        this.props.updateFishDonated({donated, index});
        this.setState({model: this.props.collections.fish.fishCollection[index]});
    }

    constructor(props: FishDetailsProps){
        super(props);
        this.index = props.route.params.index;        
        this.fish = props.route.params.fish;
    }

    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: '#9cf0c6'}} contentContainerStyle={{justifyContent: 'center'}}>
                <View style={{flex: 1, flexDirection:'column', alignItems: 'center', paddingBottom: 200}}>
                    <View style={{width: '90%', padding: 20, justifyContent:'center', backgroundColor: '#cae9f6', alignItems: 'center', marginTop: 25, borderRadius: 20, borderColor:'grey', borderWidth:5}}>
                        <Image source={FishImages[this.fish.name]}></Image>
                        <View style={{backgroundColor:"#ffecd9", padding: 20, borderRadius: 10, borderWidth: 1, borderColor: 'black'}}>
                            <Text style={{fontFamily: 'Confortaa', fontSize: 26}}>{this.fish.name}</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between', width: '80%', marginTop: 25}}>
                        <CheckBox style={{width:50, height: 50, borderRadius: 50, marginTop: 8}} checked={this.fish.caught}></CheckBox>
                        <CheckBox style={{width:50, height: 50, borderRadius: 50, marginTop: 8}} checked={this.fish.donated}></CheckBox>
                        <View style={{flexDirection: 'row', backgroundColor: '#f4fdf4', alignContent: 'center', justifyContent: 'space-between', alignItems: 'center', width: '40%', borderColor:'grey', borderWidth: 5, borderRadius: 20, padding:5}}>
                            <Image source={require('../Images/Other/BellBag.png')} style={{width: 30, height: 30, marginLeft: 5}}></Image>                            
                            <Text style={{fontFamily: 'Confortaa', fontSize: 32, marginTop: 15}}>{this.fish.value}</Text>
                        </View>
                    </View>
                    <View style={{width: '90%', flexWrap:'wrap', flexDirection:'row', justifyContent:'center', backgroundColor: '#f4fdf4', alignItems: 'center', marginTop: 25, borderRadius: 20, borderColor:'grey', borderWidth:5, padding:5}}>
                        <View style={this.fish.monthsAvailable.jan ? styles.monthItemSelected : styles.monthItem}>
                            <Text>{"Jan"}</Text>
                        </View>
                        <View style={this.fish.monthsAvailable.feb ? styles.monthItemSelected : styles.monthItem}>
                            <Text>{"Feb"}</Text>
                        </View>
                        <View style={this.fish.monthsAvailable.mar ? styles.monthItemSelected : styles.monthItem}>
                            <Text>{"Mar"}</Text>
                        </View>
                        <View style={this.fish.monthsAvailable.apr ? styles.monthItemSelected : styles.monthItem}>
                            <Text>{"Apr"}</Text>
                        </View>
                        <View style={this.fish.monthsAvailable.may ? styles.monthItemSelected : styles.monthItem}>
                            <Text>{"May"}</Text>
                        </View>
                        <View style={this.fish.monthsAvailable.jun ? styles.monthItemSelected : styles.monthItem}>
                            <Text>{"Jun"}</Text>
                        </View>
                        <View style={this.fish.monthsAvailable.jul ? styles.monthItemSelected : styles.monthItem}>
                            <Text>{"Jul"}</Text>
                        </View>
                        <View style={this.fish.monthsAvailable.aug ? styles.monthItemSelected : styles.monthItem}>
                            <Text>{"Aug"}</Text>
                        </View>
                        <View style={this.fish.monthsAvailable.sep ? styles.monthItemSelected : styles.monthItem}>
                            <Text>{"Sep"}</Text>
                        </View>
                        <View style={this.fish.monthsAvailable.oct ? styles.monthItemSelected : styles.monthItem}>
                            <Text>{"Oct"}</Text>
                        </View>
                        <View style={this.fish.monthsAvailable.nov ? styles.monthItemSelected : styles.monthItem}>
                            <Text>{"Nov"}</Text>
                        </View>
                        <View style={this.fish.monthsAvailable.dec ? styles.monthItemSelected : styles.monthItem}>
                            <Text>{"Dec"}</Text>
                        </View>
                    </View>
                    <View style={{width: '90%', padding: 10, marginTop: 25, flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{backgroundColor: '#f4fdf4', width: '45%', justifyContent: "space-evenly", alignItems:'center', borderRadius: 20, height: 150, borderWidth: 5, borderColor:'grey'}}>
                            {/* TODO: Image Here (remove height from container) */}
                            <Text>{"Location Image"}</Text>
                            <Text style={{fontFamily:'Confortaa'}}>{this.fish.locationName}</Text>
                        </View>
                        <View style={{backgroundColor: '#f4fdf4', width: '45%', justifyContent:'space-evenly', alignItems: 'center', borderRadius: 20, borderWidth: 5, borderColor:'grey', height: 150}}>
                            {/* TODO: Image Here (remove height from container) */}
                            <Text>{"Clock Image"}</Text>
                            <Text style={{fontFamily:'Confortaa'}}>{this.fish.time}</Text>
                        </View>
                    </View>
                    <View style={{width: '90%', padding: 10, justifyContent:'center', alignItems: 'center'}}>
                        <View style={{backgroundColor: '#f4fdf4', width: '45%', justifyContent:'space-evenly', alignItems: 'center', borderRadius: 20, borderWidth: 5, borderColor:'grey', height: 150}}>
                            {/* TODO: Image Here (remove height from container) */}
                            <Text>{"Shadow Image"}</Text>
                            <Text style={{fontFamily:'Confortaa'}}>{this.fish.shadowSizeName}</Text>
                        </View>
                    </View>
                    <View style={{width: '90%', alignItems: 'center'}}>
                        <View style={{width: '100%', backgroundColor:'#f4fdf4', alignItems: 'center', flexDirection: 'row', height: 50, borderColor:'grey', borderRadius: 20, borderWidth: 5, justifyContent: 'space-evenly'}}>
                            {/* TODO: Replace * with images of stars. */}
                            <Text>{"Rarity"}</Text>
                            <Text>{"*"}</Text>
                            <Text>{"*"}</Text>
                            <Text>{"*"}</Text>
                            <Text>{"*"}</Text>
                            <Text>{"*"}</Text>
                         </View>
                    </View>
                    <View style={{width: '90%', justifyContent: "center", alignItems: 'center', borderRadius: 20, borderColor: 'grey', borderWidth: 5, backgroundColor: '#f4fdf4', padding: 5, marginTop: 20}}>
                        <Text style={{justifyContent: 'center', alignItems:'center', fontFamily: 'Confortaa'}}>{"Blathers Says: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum ligula quis imperdiet pharetra. Nunc tincidunt lorem eget nibh vulputate gravida. Aenean a posuere neque. In finibus nunc non turpis fermentum, malesuada sodales odio porta. Praesent et tellus felis. Aenean eget urna ante. Morbi interdum dui dictum, iaculis ante pretium, laoreet diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec sollicitudin eleifend nibh sed molestie. Sed malesuada porttitor ultrices. Vivamus lobortis, eros non interdum maximus, lorem mauris feugiat ligula, blandit interdum neque erat vitae leo. Nullam erat leo, feugiat quis metus nec, lacinia laoreet lacus. Fusce eros lorem, egestas sit amet tincidunt id, lacinia eget nulla. Praesent commodo pharetra dui sed ornare."}</Text>
                    </View>              
                </View>
            </ScrollView>
        ) 
    }
}

const mapStateToProps = (state: any) => {
    const { collections } = state;
    return { collections }
  };
export default connect(mapStateToProps, {updateFishCaught, updateFishDonated})(FishDetails);