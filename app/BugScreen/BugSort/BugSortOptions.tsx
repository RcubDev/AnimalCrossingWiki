import React, { PureComponent } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { updateBugSort } from "../../Redux/CollectionActions";
import { View, Card, CardItem, Button, Text } from "native-base";
import styles from './BugSortOptionsStyles';
import { AdvancedSortBugModel } from "../../../models/Sort/AdvancedSortBugModel";
import { BugScreenProps } from "../../../models/MainScreenModels/BugScreen/BugScreenProps";
class BugSortOptions extends PureComponent<BugScreenProps> {
  constructor(props: BugScreenProps) {
    super(props);
  }

  resetSort(ascending: boolean, descending: boolean): AdvancedSortBugModel {
    return {
      ascending: ascending,
      descending: descending,
      value: false,
      name: false,
      rarity: false,
      critterpediaHorizontal: false,
      critterpediaVertical: false
    }
  }

  updateSort(type: string, value: boolean) {
    let sortObj = this.props.appState.bug.bugAdvancedSort;
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
        sortObj = this.resetSort(sortObj.ascending, sortObj.descending);
        sortObj.name = value;
        break;
      case 'value':
        sortObj = this.resetSort(sortObj.ascending, sortObj.descending)
        sortObj.value = value;
        break;
      case 'rarity':
        sortObj = this.resetSort(sortObj.ascending, sortObj.descending)
        sortObj.rarity = value;
        break;
      case 'critterpediahorizontal':
        sortObj = this.resetSort(sortObj.ascending, sortObj.descending)
        sortObj.critterpediaHorizontal = value;
        break;
      case 'critterpediavertical':
        sortObj = this.resetSort(sortObj.ascending, sortObj.descending)
        sortObj.critterpediaVertical = value;
        break;
    }

    this.props.updateBugSort(sortObj);
  }

  render() {
    let currentSort = this.props.appState.bug.bugAdvancedSort;
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
            <Button style={currentSort.ascending ? styles.sortButtonSelectedStyle : styles.sortButtonUnSelectedStyle} onPress={() => this.updateSort('ascending', !currentSort.ascending)}><Text>{"Ascending"}</Text></Button>
            <Button style={currentSort.descending ? styles.sortButtonSelectedStyle : styles.sortButtonUnSelectedStyle} onPress={() => this.updateSort('descending', !currentSort.descending)}><Text>{"Decending"}</Text></Button>
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
            <Button style={currentSort.name ? styles.sortButtonSelectedStyle : styles.sortButtonUnSelectedStyle} onPress={() => this.updateSort('name', !currentSort.name)}><Text>{"Name"}</Text></Button>
            <Button style={currentSort.value ? styles.sortButtonSelectedStyle : styles.sortButtonUnSelectedStyle} onPress={() => this.updateSort('value', !currentSort.value)}><Text>{"Value"}</Text></Button>
            <Button style={currentSort.rarity ? styles.sortButtonSelectedStyle : styles.sortButtonUnSelectedStyle} onPress={() => this.updateSort('rarity', !currentSort.rarity)}><Text>{"Rarity"}</Text></Button>
            <Button style={currentSort.critterpediaHorizontal ? styles.sortButtonBigSelectedStyle : styles.sortButtonBigUnSelectedStyle} onPress={() => this.updateSort('critterpediahorizontal', !currentSort.critterpediaHorizontal)}><Text>{"Critterpedia Horizontal"}</Text></Button>
            <Button style={currentSort.critterpediaVertical ? styles.sortButtonBigSelectedStyle : styles.sortButtonBigUnSelectedStyle} onPress={() => this.updateSort('critterpediavertical', !currentSort.critterpediaVertical)}><Text>{"Critterpedia Vertical"}</Text></Button>
          </CardItem>
        </Card>
      </ScrollView>
    )
  }

}

const mapStateToProps = (state: any) => {
  const { appState } = state;
  return { appState };
};

export default connect(mapStateToProps, { updateBugSort })(
  BugSortOptions
);
