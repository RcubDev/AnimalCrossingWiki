import React, { Component } from 'react';
import { Container, Button, Text, Header, Content, Footer, View, H1, CardItem, Card, CheckBox } from 'native-base';
import { CritterCollectionModel } from '../../models/models';
import { Image } from 'react-native';
import FishImages from '../Images/FishImages';
import { CritterCollectionCardModel } from '../../models/FishScreen/FishCardModel';
import { connect } from 'react-redux';
import { updateFishCaught, updateFishDonated } from '../Redux/CollectionActions';
import { NavigationScreenProp } from 'react-navigation';
import { CollectionStateModel } from '../../models/CollectionStateModel';


interface FishDetailsProps {
    navigation: NavigationScreenProp<any>,
    collections: CollectionStateModel
    updateFishCaught: typeof updateFishCaught
    updateFishDonated: typeof updateFishDonated
    route: {
        key: string,
        name: string,
        params: {
            index: number,
            fish: CritterCollectionCardModel
        }   
    }
}

interface FishDetailsState {
    model: CritterCollectionCardModel
}



class FishDetails extends Component<FishDetailsProps, FishDetailsState> {
    index = this.props.route.params.index;
    fishCardModel = this.props.collections.collection[this.index];
    fish = this.props.collections.collection[this.index].collection;
    SetItemCaught = (caught: boolean, index: number) => {
        console.log('caught');
        this.props.updateFishCaught({caught, index});
        this.setState({model: this.props.collections.collection[index]});
    }


    SetItemDonated = (donated: boolean, index: number) => {
        console.log('donated');
        this.props.updateFishDonated({donated, index});
        this.setState({model: this.props.collections.collection[index]});
    }

    constructor(props: FishDetailsProps){
        super(props);
        this.index = props.route.params.index;
        this.fishCardModel = this.props.route.params.fish;
        this.fish = this.fishCardModel.collection;
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', alignContent: 'center', marginTop: '20%'}}>
                <H1>{this.fish.name}</H1>
                <Image source={FishImages[this.fish.name]} style={{width:100, height:100}}></Image>
                <CheckBox checked={this.fishCardModel.caught} onPress={() => {this.SetItemCaught(!this.fishCardModel.caught, this.fishCardModel.collection.id)}}></CheckBox>
                <CheckBox checked={this.fishCardModel.donated} onPress={() => {this.SetItemDonated(!this.fishCardModel.donated, this.fishCardModel.collection.id)}}></CheckBox>
                <Image source={require('../Images/Other/MuseumSymbol.png')} style={{width:32, height:32}} />
                <View>
                    <Card>
                        <CardItem style={{flexDirection:'column'}}>
                            <Image source={require('../Images/Other/BellBag.png')} style={{width: 25, height:25}}></Image>
                            <Text> {this.fish.value}</Text>
                        </CardItem>
                    </Card>
                    <Text>Shadow Size: {this.fish.shadowSizeName} </Text>
                    <Text>Catch Location: {this.fish.locationName}</Text>
                    <Text>Seasonality: </Text>
                    <Text>Weather: {this.fish.weather}</Text>
                    <Text>Rarity: {this.fish.rarityName} </Text>
                    <Text>Catch Start Time: {this.fish.catchStartTime}</Text>
                    <Text>Catch End Time: {this.fish.catchEndTime}</Text>
                </View>
            </View>
        ) 
    }
}

const mapStateToProps = (state: any) => {
    const { collections } = state;
    return { collections }
  };
export default connect(mapStateToProps, {updateFishCaught, updateFishDonated})(FishDetails);