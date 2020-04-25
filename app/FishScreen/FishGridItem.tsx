import React, { Component, useState } from 'react';
import { Text, View, Container, Card, CardItem, CheckBox } from 'native-base';
import { FishModel } from '../../models/models';
import styles from './FishScreen.styles';
import { Image, StyleSheet } from 'react-native';
import FishImages from '../Images/FishImages';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationScreenProp } from 'react-navigation';
import { FishCardModel } from '../../models/FishScreen/FishCardModel';



export function FishGridItem({model, index, nav, updateFishCaught, updateFishDonated}:
                             {model: FishCardModel, index: number, nav:NavigationScreenProp<any>, updateFishCaught: any,
                              updateFishDonated: any}) {  
  const onPress = () => {
    nav.navigate("FishDetails", {fish: model, index});
  };
  const caughtOnPress = () => {
    updateFishCaught(!model.caught, index);
  };

  const donatedOnPress = () => {
    updateFishDonated(!model.donated, index);
  }

  const maxFishNameLength = 10;
  return(    
  <Container key={`${index}FishGridItem`} style={{height: 120, backgroundColor: "#c2b280"}}>
      <Card>
        <CardItem style={styles.fishGridItemCard}>
          <View>
            <TouchableOpacity onPress={onPress} style={styles.fishGridItemCard}>
              <Text key={`${index}FishGridItemName`} numberOfLines={1}>{ model.fish.fishName}</Text>
              <Image source={FishImages[model.fish.fishName]} style={styles.fishGridItem} key={`${index}FishGridItemImage`}></Image>            
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
  </Container>
  )
};

