import React, { Component, useState, PureComponent } from 'react';
import { Text, View, Container, Card, CardItem, CheckBox } from 'native-base';
import styles from './FishScreen.styles';
import { Image, StyleSheet } from 'react-native';
import FishImages from '../Images/FishImages';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationScreenProp } from 'react-navigation';
import { NewFishModel } from '../../models/CollectionModels/NewFishModel';
import { updateFishCaught, updateFishDonated } from '../Redux/CollectionActions';
import { createDispatchHook, useDispatch } from 'react-redux';

export class FishGridItem extends PureComponent<FishGridItemProps>{
  onPress = () => this.props.nav.navigate("FishDetails", { fish: this.props.model });

  setFishCaught = () => this.props.updateFishCaught({ caught: !this.props.model.caught, index: this.props.model.id });

  setFishDonated = () => this.props.updateFishDonated({ donated: !this.props.model.donated, index: this.props.model.id });

  // shouldComponentUpdate(nextProps: FishGridItemProps): boolean {
  //   return nextProps.model.caught !== this.props.model.caught || nextProps.model.donated !== this.props.model.donated
  //     || nextProps.model.id !== this.props.model.id;
  // }

  render() {
    console.log('rerender', this.props)
    return (
      <Card style={styles.card}>
        <CardItem style={styles.cardItem}>
          <View>
            <TouchableOpacity onPress={this.onPress} style={styles.fishGridItemCard}>
              <Text style={{ fontFamily: 'Confortaa' }} key={`${this.props.model.id}FishGridItemName`} numberOfLines={1}>{this.props.model.name}</Text>
              <Image source={FishImages[this.props.model.name]} style={styles.fishGridItem} key={`${this.props.model.id}FishGridItemImage`}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.cardCheckBoxContainer}>
            <View style={styles.cardCaughtCheckBox}>
              <CheckBox checked={this.props.model.caught} onPress={this.setFishCaught}></CheckBox>
            </View>
            <View style={styles.cardDonatedCheckBox}>
              <CheckBox checked={this.props.model.donated} onPress={this.setFishDonated}></CheckBox>
            </View>
          </View>
        </CardItem>
      </Card>
    )
  }
}

export interface FishGridItemProps {
  model: NewFishModel,
  nav: NavigationScreenProp<any>,
  updateFishCaught: typeof updateFishCaught,
  updateFishDonated: typeof updateFishDonated
}

