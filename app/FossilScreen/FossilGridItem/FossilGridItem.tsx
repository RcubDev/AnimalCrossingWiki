import { FossilModel } from "../../../models/CollectionModels/FossilModel";
import { NavigationScreenProp } from "react-navigation";
import { updateFossilDonated } from "../../Redux/CollectionActions";
import React, { Component } from "react";
import { Card, CardItem, View, Text, CheckBox } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from 'react-native';
import FossilImages from '../../Images/FossilImages';
import styles from './FossilGridItemStyles'


export interface FossilGridItemProps {
    model: FossilModel,
    nav: NavigationScreenProp<any>,    
    updateFossilDonated: typeof updateFossilDonated
  }

export class FossilGridItem extends Component<FossilGridItemProps>{
    constructor(props: FossilGridItemProps) {
        super(props);
      }
      

      onPress = () => {
        this.props.nav.navigate("FossilDetails", { fossil: this.props.model });
      };

      SetItemDonated = () => {
        this.props.updateFossilDonated({ donated: !this.props.model.donated, index: this.props.model.id });
      }
    

      shouldComponentUpdate(nextProps: FossilGridItemProps): boolean{
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
                <TouchableOpacity onPress={this.onPress} style={styles.fossilGridItemCard}>
                  <Text style={{fontFamily: 'Confortaa'}} key={`${this.props.model.id}FossilGridItemName`} numberOfLines={1}>{this.props.model.name}</Text>
                  <Image source={FossilImages[this.props.model.name]} style={styles.fossilGridItem} key={`${this.props.model.id}FossilGridItemImage`}></Image>
                </TouchableOpacity>
              </View>
              <View style={styles.cardCheckBoxContainer}>
                <View style={{marginRight: 15}}>
                  <CheckBox checked={this.props.model.donated} onPress={this.SetItemDonated}></CheckBox>
                </View>
              </View>
            </CardItem>
          </Card>
        )
      }
}
