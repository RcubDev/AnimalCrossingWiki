import React, { Component } from 'react';
import { Container, Button, Text, Header, Content, Footer, View, H1, CardItem, Card, CheckBox } from 'native-base';
import { FishModel } from '../../models/models';
import { Image } from 'react-native';
import FishImages from '../Images/FishImages';
import { FishCardModel } from '../../models/FishScreen/FishCardModel';

const FishDetails = (props: any) => {
    const model = props.route.params.fish as FishCardModel;
    const fish = model.fish;
    const index = props.route.params.index;
    
    return (
        <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', alignContent: 'center', marginTop: '20%'}}>
            <H1>{fish.fishName}</H1>
            <Image source={FishImages[fish.fishName]} style={{width:100, height:100}}></Image>
            <CheckBox checked={model.caught} onPress={() => {model.caught = !model.caught}}></CheckBox>
            <CheckBox checked={model.donated}></CheckBox>

            <View>
                <Card>
                    <CardItem style={{flexDirection:'column'}}>
                        <Image source={require('../Images/Other/BellBag.png')} style={{width: 25, height:25}}></Image>
                        <Text> {fish.value}</Text>
                    </CardItem>
                </Card>
                <Text>Shadow Size: {fish.shadowSizeName} </Text>
                <Text>Catch Location: {fish.locationName}</Text>
                <Text>Seasonality: </Text>
                <Text>Weather: {fish.weatherName}</Text>
                <Text>Rarity: {fish.rarityName} </Text>
                <Text>Catch Start Time: {fish.catchStartTime}</Text>
                <Text>Catch End Time: {fish.catchEndTime}</Text>
            </View>            
            
        </View>
    )
};

export default FishDetails;