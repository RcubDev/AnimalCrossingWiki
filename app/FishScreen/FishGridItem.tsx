import React, { Component, useState } from 'react';
import { Text, View, Container, Card, CardItem } from 'native-base';
import { FishModel } from '../../models/models';
import styles from './FishScreen.styles';
import { Image, StyleSheet } from 'react-native';
import FishImages from '../Images/FishImages';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationScreenProp } from 'react-navigation';



export function FishGridItem({fish, index, nav}: {fish: FishModel, index: number, nav:NavigationScreenProp<any>}) {  
  const onPress = () => {
    nav.navigate("FishDetails", {fish: fish});
  };
  return(    
  <Container key={`${index}FishGridItem`} style={styles.fishGridItemContainer}>
      <Card>
        <CardItem style={styles.fishGridItemCard}>
          <TouchableOpacity onPress={onPress} style={styles.fishGridItemCard}>
            <Text key={`${index}FishGridItemName`}>{fish.fishName}</Text>
            <Image source={FishImages[fish.fishName]} style={styles.fishGridItem} key={`${index}FishGridItemImage`}></Image>
          </TouchableOpacity>    
        </CardItem>
      </Card>
  </Container>
  )
};

