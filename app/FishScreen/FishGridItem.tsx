import React, { Component, useState } from 'react';
import { Text, View, Container, Card, CardItem, CheckBox } from 'native-base';
import { CritterCollectionModel } from '../../models/models';
import styles from './FishScreen.styles';
import { Image, StyleSheet } from 'react-native';
import FishImages from '../Images/FishImages';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationScreenProp } from 'react-navigation';
import { CritterCollectionCardModel } from '../../models/FishScreen/FishCardModel';



export function FishGridItem({model, index, nav, updateFishCaught, updateFishDonated}:
                             {model: CritterCollectionCardModel, index: number, nav:NavigationScreenProp<any>, updateFishCaught: any,
                              updateFishDonated: any}) {  
  const onPress = () => {
    nav.navigate("FishDetails", {fish: model, index});
  };
  const caughtOnPress = () => {
    console.log('caught');
    updateFishCaught(!model.caught, index);
    console.log('updated caught');
  };

  const donatedOnPress = () => {    
    updateFishDonated(!model.donated, index);
  }

  return(
      <Card style={{width: "23%"}}>
        <CardItem style={{flexDirection: "column", backgroundColor:'#c2b280'}}>
          <View>
            <TouchableOpacity onPress={onPress} style={styles.fishGridItemCard}>
              <Text key={`${index}FishGridItemName`} numberOfLines={1}>{ model.collection.name}</Text>
              <Image source={FishImages[model.collection.name]} style={styles.fishGridItem} key={`${index}FishGridItemImage`}></Image>            
            </TouchableOpacity>   
          </View>
          <View style={{flexDirection: "row", width:'100%', alignItems: 'stretch'}}>
              <View style={{marginLeft: -10}}>
                <CheckBox checked={model.caught} onPress={caughtOnPress}></CheckBox>
              </View>
              <View style={{position:"absolute", right:0, marginRight:10}}>
                <CheckBox checked={model.donated} onPress={donatedOnPress}></CheckBox>                
              </View>
            </View>
        </CardItem>
      </Card>
  )
};

