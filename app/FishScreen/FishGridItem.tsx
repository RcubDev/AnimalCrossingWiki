import React, { Component, useState } from 'react';
import { Text, View, Container, Card, CardItem, CheckBox } from 'native-base';
import styles from './FishScreen.styles';
import { Image, StyleSheet } from 'react-native';
import FishImages from '../Images/FishImages';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationScreenProp } from 'react-navigation';
import { NewFishModel } from '../../models/CollectionModels/NewFishModel';



export function FishGridItem({model, index, nav, updateFishCaught, updateFishDonated}:
                             {model: NewFishModel, index: number, nav:NavigationScreenProp<any>, updateFishCaught: any,
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

  return(
      <Card style={styles.card}>
        <CardItem style={styles.cardItem}>
          <View>
            <TouchableOpacity onPress={onPress} style={styles.fishGridItemCard}>
              <Text key={`${index}FishGridItemName`} numberOfLines={1}>{ model.name}</Text>
              <Image source={FishImages[model.name]} style={styles.fishGridItem} key={`${index}FishGridItemImage`}></Image>            
            </TouchableOpacity>   
          </View>
          <View style={styles.cardCheckBoxContainer}>
              <View style={styles.cardCaughtCheckBox}>
                <CheckBox checked={model.caught} onPress={caughtOnPress}></CheckBox>
              </View>
              <View style={styles.cardDonatedCheckBox}>
                <CheckBox checked={model.donated} onPress={donatedOnPress}></CheckBox>                
              </View>
            </View>
        </CardItem>
      </Card>
  )
};

