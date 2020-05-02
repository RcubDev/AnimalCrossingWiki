import React, { Component, useState, PureComponent } from 'react';
import { Text, View, Container, Card, CardItem, CheckBox } from 'native-base';
import styles from './FishScreen.styles';
import { Image, StyleSheet } from 'react-native';
import FishImages from '../Images/FishImages';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationScreenProp } from 'react-navigation';
import { NewFishModel } from '../../models/CollectionModels/NewFishModel';
import { updateFishCaught, updateFishDonated } from '../Redux/CollectionActions';

export interface FishGridItemProps {
  model: NewFishModel,
  nav: NavigationScreenProp<any>,
  updateFishCaught: typeof updateFishCaught,
  updateFishDonated: typeof updateFishDonated
}

export class FishGridItem extends Component<FishGridItemProps>{
  constructor(props: FishGridItemProps) {
    super(props);
  }

  onPress = () => {
    this.props.nav.navigate("FishDetails", { fish: this.props.model });
  };

  SetItemCaught = () => {
    this.props.updateFishCaught({ caught: !this.props.model.caught, index: this.props.model.id });
  }

  SetItemDonated = () => {
    this.props.updateFishDonated({ donated: !this.props.model.donated, index: this.props.model.id });
  }

  shouldComponentUpdate(nextProps: FishGridItemProps): boolean{
    if(nextProps.model.caught !== this.props.model.caught || nextProps.model.donated !== this.props.model.donated
       || nextProps.model.id !== this.props.model.id){
      return true;
    }
    else{
      return false;
    }
  }

  render() {
    return (
      <Card style={styles.card}>
        <CardItem style={styles.cardItem}>
          <View>
            <TouchableOpacity onPress={this.onPress} style={styles.fishGridItemCard}>
              <Text style={{fontFamily: 'Confortaa'}} key={`${this.props.model.id}FishGridItemName`} numberOfLines={1}>{this.props.model.name}</Text>
              <Image source={FishImages[this.props.model.name]} style={styles.fishGridItem} key={`${this.props.model.id}FishGridItemImage`}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.cardCheckBoxContainer}>
            <View style={styles.cardCaughtCheckBox}>
              <CheckBox checked={this.props.model.caught} onPress={this.SetItemCaught}></CheckBox>
            </View>
            <View style={styles.cardDonatedCheckBox}>
              <CheckBox checked={this.props.model.donated} onPress={this.SetItemDonated}></CheckBox>
            </View>
          </View>
        </CardItem>
      </Card>
    )
  }
}
