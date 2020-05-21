import React, { PureComponent } from 'react';
import { View, Card, CardItem, CheckBox, Item } from 'native-base';
import { Image, Text } from 'react-native';
import { IDictionary } from '../Images/FishImages';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationScreenProp } from 'react-navigation';
import { updateItemCatalogged, updateCreatureCaught, updateCreatureDonated, updateItemDonated, updateModelObtained, updateVillagerFavorited, updateVillagerInVillage } from '../ReduxV2/CollectionActions'
import { CreatureModel } from '../../models/CollectionModelsV2/creatures';
import { ItemModel, ItemSourceSheet } from '../../models/CollectionModelsV2/items';
import { ReactionModel } from '../../models/CollectionModelsV2/reactions';
import { VillagerModel } from '../../models/CollectionModelsV2/villagers';

export class GridItem extends PureComponent<GridItemProps> {

  onPress = () => this.props.navigation.navigate(this.props.navigateTo, { ...this.props, setItemCaught: this.setItemCaught, setItemDonated: this.setItemDonated });

  setItemCaught = () => this.props.updateCaught && this.props.updateCaught({ caught: !(this.props.model as CreatureModel).caught, id: (this.props.model as CreatureModel).internalId, type: this.props.model.sourceSheet === "Fish" ? "Fish" : "Bug" });

  setItemDonated = () => {
    if (this.props.model.sourceSheet !== "Fish" && this.props.model.sourceSheet !== "Bugs") {
      if (this.props.model as ItemModel && this.props.updateItemDonated) {
        this.props.updateItemDonated({ donated: !(this.props.model as ItemModel).donated, name: this.props.model.name, type: this.props.model.sourceSheet === "Fossils" ? "Fossil" : "Artwork" })
      }
    }
    else {
      if (this.props.model as CreatureModel && this.props.updateDonated) {
        this.props.updateDonated({ donated: !this.props.model.donated, id: this.props.model.internalId, type: this.props.model.sourceSheet === "Fish" ? "Fish" : "Bug" })
      }
    }
  };

  setItemCatalogged = () => {
    if (this.props.model as ItemModel && this.props.updateItemCatalogged) {
      let item = this.props.model as ItemModel;
      this.props.updateItemCatalogged({
        catalogged: !item.catalogged,
        name: item.name,
        subcategory: item.sourceSheet
      });
    }
  }

  setModelObtained = () => {
    if (this.props.model as ReactionModel && this.props.updateModelObtained) {
      let item = this.props.model as ReactionModel;
      this.props.updateModelObtained({
        obtained: !item.obtained,
        name: this.props.model.name
      })
    }
  }

  setVillagerFavorited = () => {
    if (this.props.model as VillagerModel && this.props.updateVillagerFavorited) {      
      let item = this.props.model as VillagerModel
      this.props.updateVillagerFavorited({
        favorite: !item.favorited,
        name: item.name
      });
    }
  }

  setVillagerInVillage = () => {
    if (this.props.model as VillagerModel && this.props.updateVillagerInVillage) {
      let item = this.props.model as VillagerModel;
      this.props.updateVillagerInVillage({
        inVillage: !item.inVillage,
        name: item.name
      });
    }
  }

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
          if (item.variants && item.variants.length > 0 && item.variants[0].image) {
            uri = item.variants[0].image;
          }
          break;
        case ItemSourceSheet.Other:
          if (item.variants && item.variants.length > 0) {
            if (item.variants[0].inventoryImage) {
              uri = item.variants[0].inventoryImage;
            }
            if (item.variants[0].storageImage) {
              uri = item.variants[0].storageImage;
            }
          }
          break;
      }
    }
    else if ("caught" in this.props.model) {
      let item = this.props.model as CreatureModel
      if (item.critterpediaImage) {
        uri = item.iconImage;
      }
    }
    else if ((this.props.model as ReactionModel).obtained !== undefined) {
      let item = this.props.model as ReactionModel
      if (item.image) {
        uri = item.image;
      }
    }
    else if ("inVillage" in this.props.model) {
      let item = this.props.model as VillagerModel
      if (item.iconImage) {
        uri = item.iconImage;
      }
    }

    return uri;
  }

  render() {
    const { model, images, styles } = this.props;
    const { donated, name, caught } = (model as CreatureModel);
    const { catalogged } = (model as ItemModel);
    const { obtained } = (model as ReactionModel);
    const { inVillage, favorited } = (model as VillagerModel);
    return (
      <Card style={styles.gridItemContainer} >
        <CardItem style={styles.gridItemContainerItem}>
          <View>
            <TouchableOpacity onPress={this.onPress} style={styles.gridItemCard}>
              <Text style={{ fontFamily: 'Confortaa' }} key={`${name}Text`} numberOfLines={1}>{name}</Text>
              <Image source={images !== undefined ? images[name] : { uri: this.getImageSource() }} style={styles.gridItem} key={`${name}Image`}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.cardCheckBoxContainer}>
            {('caught' in model) && (
              <View style={styles.cardCaughtCheckBox}>
                <CheckBox checked={caught} onPress={this.setItemCaught}></CheckBox>
              </View>)}
            {(model as ItemModel).donated !== undefined &&
              <View style={styles.cardDonatedCheckBox}>
                <CheckBox checked={donated} onPress={this.setItemDonated}></CheckBox>
              </View>
            }
            {(model as ItemModel).catalogged !== undefined &&
              <View style={styles.cardDonatedCheckBox}>
                <CheckBox checked={catalogged} onPress={this.setItemCatalogged}></CheckBox>
              </View>
            }
            {(model as ReactionModel).obtained !== undefined &&
              <View style={styles.cardDonatedCheckBox}>
                <CheckBox checked={obtained} onPress={this.setModelObtained}></CheckBox>
              </View>
            }
            {(model as VillagerModel).favorited !== undefined &&

              <><View style={styles.cardDonatedCheckBox}>
                <CheckBox checked={favorited} onPress={this.setVillagerFavorited}></CheckBox>
              </View>
                <View style={styles.cardDonatedCheckBox}>
                  <CheckBox checked={inVillage} onPress={this.setVillagerInVillage}></CheckBox>
                </View>
              </>
            }
          </View>
        </CardItem>
      </Card>
    )
  }
}

export interface GridItemProps {
  model: CreatureModel | ItemModel | ReactionModel | VillagerModel,
  navigation: NavigationScreenProp<any>,
  navigateTo: string,
  updateCaught?: typeof updateCreatureCaught,
  updateDonated?: typeof updateCreatureDonated
  updateItemDonated?: typeof updateItemDonated,
  updateItemCatalogged?: typeof updateItemCatalogged,
  updateModelObtained?: typeof updateModelObtained,
  updateVillagerFavorited?: typeof updateVillagerFavorited,
  updateVillagerInVillage?: typeof updateVillagerInVillage,
  images: IDictionary | undefined,
  styles: any, // TDO add styles interface
  type: string,
}
