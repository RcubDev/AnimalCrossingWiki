import React, { PureComponent } from 'react';
import { View, Card, CardItem, CheckBox } from 'native-base';
import { Image, Text } from 'react-native';
import { IDictionary } from '../Images/FishImages';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationScreenProp } from 'react-navigation';
import { updateFishCaught, updateFishDonated } from '../Redux/CollectionActions';
import { CritterModel } from '../../models/CollectionModels/CritterModel';
import { FossilModel } from '../../models/CollectionModels/FossilModel';
import { ArtworkModel } from '../../models/CollectionModels/ArtworkModel';

export class GridItem extends PureComponent<GridItemProps> {

  onPress = () => this.props.navigation.navigate(this.props.navigateTo, { ...this.props, setItemCaught: this.setItemCaught, setItemDonated: this.setItemDonated });

  setItemCaught = () => this.props.updateCaught && this.props.updateCaught({ caught: !(this.props.model as CritterModel).caught, index: this.props.model.id });

  setItemDonated = () => this.props.updateDonated({ donated: !this.props.model.donated, index: this.props.model.id });

  render() {
    const { model, images, styles } = this.props;
    const { donated, name, id, caught } = (model as CritterModel);

    return (
      <Card style={styles.gridItemContainer} >
        <CardItem style={styles.gridItemContainerItem}>
          <View>
            <TouchableOpacity onPress={this.onPress} style={styles.gridItemContent}>
              <Text style={styles.gridItemText} key={`${id}Text`} numberOfLines={1}>{name}</Text>
              <Image style={styles.gridItemImage} source={images[name]} key={`${id}Image`}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.gridItemCheckBoxContainer}>
            {('caught' in model) && (
              <View style={styles.gridItemCaughtCheckBox}>
                <CheckBox checked={caught} onPress={this.setItemCaught}></CheckBox>
              </View>)}
            <View style={styles.gridItemDonatedCheckBox}>
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
  images: IDictionary,
  styles: any, // TDO add styles interface
  type: string,
}
