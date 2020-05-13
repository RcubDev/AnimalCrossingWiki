import React, { PureComponent } from 'react';
import { View, Card, CardItem, CheckBox } from 'native-base';
import { Image, Text } from 'react-native';
import { IDictionary } from '../Images/FishImages';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationScreenProp } from 'react-navigation';
import {updateItemCatalogged, updateCreatureCaught, updateCreatureDonated, updateItemDonated } from '../ReduxV2/CollectionActions'
import { CreatureModel } from '../../models/CollectionModelsV2/creatures';
import { ItemModel } from '../../models/CollectionModelsV2/items';

export class GridItem extends PureComponent<GridItemProps> {

  onPress = () => this.props.navigation.navigate(this.props.navigateTo, { model: this.props.model });

  setItemCaught = () => this.props.updateCaught && this.props.updateCaught({ caught: !(this.props.model as CreatureModel).caught, id: (this.props.model as CreatureModel).internalId, type: this.props.model.sourceSheet === "Fish" ? "Fish" : "Bug" });

  setItemDonated = () => {
    console.log('donated');
    if(this.props.model.sourceSheet !== "Fish" && this.props.model.sourceSheet !== "Bugs"){
      if(this.props.model as ItemModel && this.props.updateItemDonated){
        this.props.updateItemDonated({donated: !this.props.model.donated, name: this.props.model.name, type: this.props.model.sourceSheet === "Fossils" ? "Fossil" : "Artwork"})
      }
    }
    else{
      console.log('donating');
      if(this.props.model as CreatureModel && this.props.updateDonated){
        this.props.updateDonated({ donated: !this.props.model.donated, id: this.props.model.internalId, type: this.props.model.sourceSheet === "Fish" ? "Fish" : "Bug"})
      }
    }
  };

  render() {
    const { model, images, styles } = this.props;
    const { donated, name, id, caught } = (model as CreatureModel);

    return (
      <Card style={styles.card} >
        <CardItem style={styles.cardItem}>
          <View>
            <TouchableOpacity onPress={this.onPress} style={styles.gridItemCard}>
              <Text style={{ fontFamily: 'Confortaa' }} key={`${id}Text`} numberOfLines={1}>{name}</Text>
              <Image source={images[name]} style={styles.gridItem} key={`${id}Image`}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.cardCheckBoxContainer}>
            {((model as CreatureModel).caught !== undefined) && (
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
  model: CreatureModel | ItemModel,
  navigation: NavigationScreenProp<any>,
  navigateTo: string,
  updateCaught?: typeof updateCreatureCaught,
  updateDonated?: typeof updateCreatureDonated
  updateItemDonated?: typeof updateItemDonated,
  updateItemCatalogged?: typeof updateItemCatalogged,
  images: IDictionary,
  styles: any, // TDO add styles interface
}
