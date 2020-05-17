import React, { PureComponent } from 'react';
import { View, Card, CardItem, CheckBox, Item } from 'native-base';
import { Image, Text } from 'react-native';
import { IDictionary } from '../Images/FishImages';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationScreenProp } from 'react-navigation';
import { updateItemCatalogged, updateCreatureCaught, updateCreatureDonated, updateItemDonated } from '../ReduxV2/CollectionActions'
import { CreatureModel } from '../../models/CollectionModelsV2/creatures';
import { ItemModel, ItemSourceSheet } from '../../models/CollectionModelsV2/items';
import { ReactionModel } from '../../models/CollectionModelsV2/reactions';

export class GridItem extends PureComponent<GridItemProps> {

  onPress = () => this.props.navigation.navigate(this.props.navigateTo, { model: this.props.model });

  setItemCaught = () => this.props.updateCaught && this.props.updateCaught({ caught: !(this.props.model as CreatureModel).caught, id: (this.props.model as CreatureModel).internalId, type: this.props.model.sourceSheet === "Fish" ? "Fish" : "Bug" });

  setItemDonated = () => {
    if (this.props.model.sourceSheet !== "Fish" && this.props.model.sourceSheet !== "Bugs") {
      if (this.props.model as ItemModel && this.props.updateItemDonated) {
        this.props.updateItemDonated({ donated: !this.props.model.donated, name: this.props.model.name, type: this.props.model.sourceSheet === "Fossils" ? "Fossil" : "Artwork" })
      }
    }
    else {
      if (this.props.model as CreatureModel && this.props.updateDonated) {
        this.props.updateDonated({ donated: !this.props.model.donated, id: this.props.model.internalId, type: this.props.model.sourceSheet === "Fish" ? "Fish" : "Bug" })
      }
    }
  };

  getImageSource(): string {
    let uri = "";
    if ("catalogged" in this.props.model) {
      let item = (this.props.model) as ItemModel;
      switch (item.sourceSheet) {
        case ItemSourceSheet.Music:
          if (item.variants && item.variants.length > 0 && item.variants[0].albumImage) {
            uri = item.variants[0].albumImage;
          }
          break;
        case ItemSourceSheet.Accessories:
        case ItemSourceSheet.Bags:
        case ItemSourceSheet.Bottoms:
        case ItemSourceSheet.DressUp:
        case ItemSourceSheet.Headwear:
        case ItemSourceSheet.Shoes:
        case ItemSourceSheet.Socks:
        case ItemSourceSheet.Tops:
        case ItemSourceSheet.Umbrellas:
          if (item.variants && item.variants.length > 0 && item.variants[0].closetImage) {
            uri = item.variants[0].closetImage;
          }
          break;
        case ItemSourceSheet.Fencing:
        case ItemSourceSheet.Floors:
        case ItemSourceSheet.Housewares:
        case ItemSourceSheet.Miscellaneous:
        case ItemSourceSheet.Photos:
        case ItemSourceSheet.Posters:
        case ItemSourceSheet.Rugs:
        case ItemSourceSheet.Tools:
        case ItemSourceSheet.WallMounted:
        case ItemSourceSheet.Wallpapers:
        case ItemSourceSheet.Fossils:
          if(item.variants && item.variants.length > 0 && item.variants[0].image){
            uri = item.variants[0].image;
          }
          break;
        case ItemSourceSheet.Other:
          if(item.variants && item.variants.length > 0){
            if(item.variants[0].inventoryImage){
              uri = item.variants[0].inventoryImage;
            }
            if(item.variants[0].storageImage){
              uri = item.variants[0].storageImage;
            }
          }
          break;
      }
    }
    else if("caught" in this.props.model) {
      let item = this.props.model as CreatureModel
      if(item.critterpediaImage){
        uri = item.iconImage;
      }
    }
    else if("obtained" in this.props.model) {
      let item = this.props.model as ReactionModel
      if(item.image){
        uri = item.image;
      }
    }

    return uri;
  }

  render() {
    const { model, images, styles } = this.props;
    const { donated, name, caught } = (model as CreatureModel);

    return (
      <Card style={styles.card} >
        <CardItem style={styles.cardItem}>
          <View>
            <TouchableOpacity onPress={this.onPress} style={styles.gridItemCard}>
              <Text style={{ fontFamily: 'Confortaa' }} key={`${name}Text`} numberOfLines={1}>{name}</Text>
              <Image source={images !== undefined ? images[name] : { uri: this.getImageSource() }} style={styles.gridItem} key={`${name}Image`}></Image>
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
  images: IDictionary | undefined,
  styles: any, // TDO add styles interface
}
