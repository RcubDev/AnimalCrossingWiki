import { ArtworkModel } from "../../../models/CollectionModels/ArtworkModel";
import { NavigationScreenProp } from "react-navigation";
import { updateArtworkDonated } from "../../Redux/CollectionActions";
import React, { Component } from "react";
import { Card, CardItem, View, Text, CheckBox } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from 'react-native';
import ArtworkImages from '../../Images/ArtworkImages';
import styles from './ArtworkGridItemStyles'


export interface ArtworkGridItemProps {
    model: ArtworkModel,
    nav: NavigationScreenProp<any>,    
    updateArtworkDonated: typeof updateArtworkDonated
  }

export class ArtworkGridItem extends Component<ArtworkGridItemProps>{
    constructor(props: ArtworkGridItemProps) {
        super(props);
      }
      

      onPress = () => {
        this.props.nav.navigate("ArtworkDetails", { artwork: this.props.model });
      };

      SetItemDonated = () => {
        this.props.updateArtworkDonated({ donated: !this.props.model.donated, index: this.props.model.id });
      }
    

      shouldComponentUpdate(nextProps: ArtworkGridItemProps): boolean{
        if(nextProps.model.donated !== this.props.model.donated || nextProps.model.id !== this.props.model.id){
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
                <TouchableOpacity onPress={this.onPress} style={styles.artworkGridItemCard}>
                  <Text style={{fontFamily: 'Confortaa'}} key={`${this.props.model.id}ArtworkGridItemName`} numberOfLines={1}>{this.props.model.name}</Text>
                  <Image source={ArtworkImages[this.props.model.name]} style={styles.artworkGridItem} key={`${this.props.model.id}ArtworkGridItemImage`}></Image>
                </TouchableOpacity>
              </View>
              <View style={styles.cardCheckBoxContainer}>
                <View style={{marginRight: 15, marginTop: 10}}>
                  <CheckBox checked={this.props.model.donated} onPress={this.SetItemDonated}></CheckBox>
                </View>
              </View>
            </CardItem>
          </Card>
        )
      }
}
