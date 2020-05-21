import React, { PureComponent } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Card, CardItem, Button, Text } from "native-base";
import styles from './Styles/SortOptionsStyles';
import { SortProps } from "../../models/Sort/SortProps";
import { SortModel } from "../../models/Sort/SortModel";

export class SortOptions extends PureComponent<SortProps> {
  constructor(props: SortProps) {
    super(props);
  }

  resetSort(ascending: boolean, descending: boolean, sort: SortModel): SortModel {
    return {
      shadowSize: sort.shadowSize === undefined ? undefined : false,
      ascending: ascending,
      descending: descending,
      sellPrice: sort.sellPrice === undefined ? undefined : false,
      name: sort.name === undefined ? undefined : false,
      rarity: sort.rarity === undefined ? undefined : false,
      critterpediaHorizontal: sort.critterpediaHorizontal === undefined ? undefined : false,
      critterpediaVertical: sort.critterpediaVertical === undefined ? undefined : false
    }
  }

  updateSort(type: string, value: boolean): void{
      let sortObj = this.props.currentSort;
      if(type.toLowerCase() !== "ascending" && type.toLowerCase() !== "descending"){
        sortObj = this.resetSort(sortObj.ascending, sortObj.descending, sortObj);
      }
      
      switch (type.toLowerCase()) {
        case 'ascending':
          if(value && sortObj.descending){
            sortObj.descending = false;
          }
          sortObj.ascending = value;
          break;
        case 'descending':
          if(value && sortObj.ascending){
            sortObj.ascending = false;
          }
          sortObj.descending = value;
          break;
        case 'name':
          sortObj.name = value;
          break;
        case 'sellprice':
          sortObj.sellPrice = value;
          break;
        case 'rarity':
          sortObj.rarity = value;
          break;
        case 'shadowsize':          
          sortObj.shadowSize = value;
          break;
        case 'critterpediahorizontal':
          sortObj.critterpediaHorizontal = value;
          break;
        case 'critterpediavertical':
          sortObj.critterpediaVertical = value;
          break;
      }
      this.props.setSortModel({...sortObj});
  }

  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: "#FFFFFF",
          width: "95%",
          borderRadius: 10,
          marginLeft: "2.5%",
        }}
        contentContainerStyle={{ justifyContent: "center" }}
      >
        <Card>
          <CardItem>
            <Text>{"Sort Order (Default: Ascending)"}</Text>
          </CardItem>
          <CardItem style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }} >
            <Button style={this.props.currentSort.ascending ? styles.sortButtonSelectedStyle : styles.sortButtonUnSelectedStyle} onPress={() => {this.updateSort('ascending', !this.props.currentSort.ascending)}}><Text>{"Ascending"}</Text></Button>
            <Button style={this.props.currentSort.descending ? styles.sortButtonSelectedStyle : styles.sortButtonUnSelectedStyle} onPress={() => {this.updateSort('descending', !this.props.currentSort.descending)}}><Text>{"Descending"}</Text></Button>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <Text>{"Sort By (Default: Name)"}</Text>
          </CardItem>
          <CardItem style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}>
            <Button style={this.props.currentSort.name ? styles.sortButtonSelectedStyle : styles.sortButtonUnSelectedStyle} onPress={() => this.updateSort('name', !this.props.currentSort.name)}><Text>{"Name"}</Text></Button>
            {this.props.currentSort.sellPrice && <Button style={this.props.currentSort.sellPrice ? styles.sortButtonSelectedStyle : styles.sortButtonUnSelectedStyle} onPress={() => this.updateSort('sellPrice', !this.props.currentSort.sellPrice)}><Text>{"Sell Price"}</Text></Button>}
            {this.props.currentSort.shadowSize !== undefined && <Button style={this.props.currentSort.shadowSize ? styles.sortButtonSelectedStyle : styles.sortButtonUnSelectedStyle} onPress={() => this.updateSort('shadowsize', !this.props.currentSort.shadowSize)}><Text>{"Shadow Size"}</Text></Button>}
            {this.props.currentSort.critterpediaHorizontal !== undefined && <Button style={this.props.currentSort.critterpediaHorizontal ? styles.sortButtonBigSelectedStyle : styles.sortButtonBigUnSelectedStyle} onPress={() => this.updateSort('critterpediahorizontal', !this.props.currentSort.critterpediaHorizontal)}><Text>{"Critterpedia Horizontal"}</Text></Button>}
            {this.props.currentSort.critterpediaVertical !== undefined && <Button style={this.props.currentSort.critterpediaVertical ? styles.sortButtonBigSelectedStyle : styles.sortButtonBigUnSelectedStyle} onPress={() => this.updateSort('critterpediavertical', !this.props.currentSort.critterpediaVertical)}><Text>{"Critterpedia Vertical"}</Text></Button>}
          </CardItem>
        </Card>
      </ScrollView>
    )
  }

}