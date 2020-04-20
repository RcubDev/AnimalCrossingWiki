import React, { Component } from 'react';
import { Text, View, Container, Card, CardItem } from 'native-base';
import { FishModel } from '../../models/models';
import styles from './FishScreen.styles';
import { Image, StyleSheet } from 'react-native';
import FishImages from '../Images/FishImages';
import { TouchableOpacity } from 'react-native-gesture-handler';



export function FishGridItem({fish, index}: {fish: FishModel, index: number}) {  
  console.log(index);
  return(    
  <Container key={`${index}FishGridItem`} style={styles.fishGridItemContainer}>
    <TouchableOpacity>
      <Card>
        <CardItem style={styles.fishGridItemCard}>
          <Text key={`${index}FishGridItemName`}>{fish.fishName}</Text>
          <Image source={FishImages[fish.fishName]} style={styles.fishGridItem} key={`${index}FishGridItemImage`}></Image>
        </CardItem>
      </Card>
    </TouchableOpacity>    
  </Container>
  )
};

