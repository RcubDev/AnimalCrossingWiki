import React, { Component, useState, PureComponent } from 'react';
import { Text, View, Container, Card, CardItem, CheckBox } from 'native-base';
import styles from '../BugScreen.styles';
import { Image, StyleSheet } from 'react-native';
import BugImages from '../../Images/BugImages';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationScreenProp } from 'react-navigation';
import { updateBugCaught, updateBugDonated } from '../../Redux/CollectionActions';
import { BugModel } from '../../../models/CollectionModels/BugModel';

export interface BugGridItemProps {
  model: BugModel,
  nav: NavigationScreenProp<any>,
  updateBugCaught: typeof updateBugCaught,
  updateBugDonated: typeof updateBugDonated
}

export class BugGridItem extends Component<BugGridItemProps>{
  constructor(props: BugGridItemProps) {
    super(props);
  }

  onPress = () => {
    this.props.nav.navigate("BugDetails", { bug: this.props.model });
  };

  SetItemCaught = () => {
    this.props.updateBugCaught({ caught: !this.props.model.caught, index: this.props.model.id });
  }

  SetItemDonated = () => {
    this.props.updateBugDonated({ donated: !this.props.model.donated, index: this.props.model.id });
  }

  shouldComponentUpdate(nextProps: BugGridItemProps): boolean{
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
            <TouchableOpacity onPress={this.onPress} style={styles.bugGridItemCard}>
              <Text style={{fontFamily: 'Confortaa'}} key={`${this.props.model.id}BugGridItemName`} numberOfLines={1}>{this.props.model.name}</Text>
              <Image source={BugImages[this.props.model.name]} style={styles.bugGridItem} key={`${this.props.model.id}BugGridItemImage`}></Image>
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
