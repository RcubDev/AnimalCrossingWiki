import React, { PureComponent } from 'react';
import { View, Card, CardItem, CheckBox } from 'native-base';
import styles from './GridItemStyles';
import { Image, Text } from 'react-native';
import FishImages, { IDictionary } from '../Images/FishImages';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationScreenProp } from 'react-navigation';
import { updateFishCaught, updateFishDonated } from '../Redux/CollectionActions';
import { CritterModel } from '../../models/CollectionModels/CritterModel';
import { FossilModel } from '../../models/CollectionModels/FossilModel';
import { ArtworkModel } from '../../models/CollectionModels/ArtworkModel';
import { CritterCollectionModel } from '../../models/CollectionModels/CritterCollectionModel';

export class GridItem extends PureComponent<GridItemProps> {

  onPress = () => this.props.navigation.navigate(this.props.navigateTo, { model: this.props.model });

  setItemCaught = () => this.props.updateCaught && this.props.updateCaught({ caught: !(this.props.model as CritterModel).caught, index: this.props.model.id });

  setItemDonated = () => this.props.updateDonated({ donated: !this.props.model.donated, index: this.props.model.id });

  render() {
    const { model, images } = this.props;
    const { donated, name, id } = model;
    let caught;

    if ((model as CritterModel).caught) {
      caught = (model as CritterModel).caught;
    }


    return (
      <Card style={styles.card} >
        <CardItem style={styles.cardItem}>
          <View>
            <TouchableOpacity onPress={this.onPress} style={styles.fishGridItemCard}>
              <Text style={{ fontFamily: 'Confortaa' }} key={`${id}Text`} numberOfLines={1}>{name}</Text>
              <Image source={images[name]} style={styles.fishGridItem} key={`${id}Image`}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.cardCheckBoxContainer}>
            {((model as CritterModel).caught !== undefined) && (
              <View style={styles.cardCaughtCheckBox}>
                <CheckBox checked={caught} onPress={this.setItemCaught}></CheckBox>
              </View>)}
            <View style={styles.cardDonatedCheckBox}>
              <CheckBox checked={donated} onPress={this.setItemDonated}></CheckBox>
            </View>
          </View>
        </CardItem>
      </Card>
    )
  }
}

export interface GridItemProps {
  model: CritterModel | FossilModel | ArtworkModel,
  navigation: NavigationScreenProp<any>,
  navigateTo: string,
  updateCaught?: typeof updateFishCaught,
  updateDonated: typeof updateFishDonated,
  images: IDictionary
}
