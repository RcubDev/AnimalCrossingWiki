import React, { Component } from 'react';
import { Container, Button, Text, Header, Content, Footer, View, H1 } from 'native-base';
import { FishModel } from '../../models/models';
import { Image } from 'react-native';
import FishImages from '../Images/FishImages';

const FishDetails = (props: any) => {
    const fish = props.route.params.fish as FishModel;
    return (
        <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', alignContent: 'center', marginTop: '20%'}}>
            <H1>{fish.fishName}</H1>
            <Image source={FishImages[fish.fishName]} style={{width:100, height:100}}></Image>
            <Text>Value: {fish.value}</Text>
            <Text>Shadow Size: {fish.shadowSizeName} </Text>
            <Text>Catch Location: {fish.locationName}</Text>
            <Text>Seasonality: </Text>
            <Text>Weather: {fish.weatherName}</Text>
            <Text>Rarity: {fish.rarityName} </Text>
            <Text>Catch Start Time: {fish.catchStartTime}</Text>
            <Text>Catch End Time: {fish.catchEndTime}</Text>
        </View>
    )
};

export default FishDetails;