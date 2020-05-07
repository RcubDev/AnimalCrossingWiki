import React, { PureComponent } from 'react';
import { Text, View, Card, CardItem, CheckBox } from 'native-base';
import styles from './FishScreen.styles';
import { Image } from 'react-native';
import FishImages from '../Images/FishImages';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationScreenProp } from 'react-navigation';
import { NewFishModel } from '../../models/CollectionModels/NewFishModel';
import { updateFishCaught, updateFishDonated } from '../Redux/CollectionActions';

export class FishGridItem extends PureComponent<FishGridItemProps>{
  onPress = () => this.props.nav.navigate("FishDetails", { fish: this.props.fish });

  setFishCaught = () => this.props.updateFishCaught({ caught: !this.props.fish.caught, index: this.props.fish.id });

  setFishDonated = () => this.props.updateFishDonated({ donated: !this.props.fish.donated, index: this.props.fish.id });

  render() {
    const {fish} = this.props;
    const {id, name, caught, donated} = fish;

    return (
      <Card style={styles.card}>
        <CardItem style={styles.cardItem}>
          <View>
            <TouchableOpacity onPress={this.onPress} style={styles.fishGridItemCard}>
              <Text style={{ fontFamily: 'Confortaa' }} key={`${id}FishGridItemName`} numberOfLines={1}>{name}</Text>
              <Image source={FishImages[name]} style={styles.fishGridItem} key={`${id}FishGridItemImage`}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.cardCheckBoxContainer}>
            <View style={styles.cardCaughtCheckBox}>
              <CheckBox checked={caught} onPress={this.setFishCaught}></CheckBox>
            </View>
            <View style={styles.cardDonatedCheckBox}>
              <CheckBox checked={donated} onPress={this.setFishDonated}></CheckBox>
            </View>
          </View>
        </CardItem>
      </Card>
    )
  }
}

export interface FishGridItemProps {
  fish: NewFishModel,
  nav: NavigationScreenProp<any>,
  updateFishCaught: typeof updateFishCaught,
  updateFishDonated: typeof updateFishDonated
}

