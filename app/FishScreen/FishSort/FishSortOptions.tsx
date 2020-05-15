import React, { PureComponent } from "react";
import { FishScreenProps } from "../../../models/MainScreenModels/FishScreen/FishScreenProps";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { updateFishSort } from "../../Redux/CollectionActions";
import { View, Card, CardItem, Button, Text } from "native-base";
import { AdvancedSortFishModel } from "../../../models/Sort/AdvancedSortFishModel";
import styles from './FishSortOptionsStyles';
class FishSortOptions extends PureComponent<FishScreenProps> {
  constructor(props: FishScreenProps) {
    super(props);
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
            <Button style={currentSort.ascending ? styles.sortButtonSelectedStyle : styles.sortButtonUnSelectedStyle} onPress={() => {}}><Text>{"Ascending"}</Text></Button>
            <Button style={currentSort.descending ? styles.sortButtonSelectedStyle : styles.sortButtonUnSelectedStyle} onPress={() => {}}><Text>{"Decending"}</Text></Button>
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
            <Button style={currentSort.shadowSize ? styles.sortButtonSelectedStyle : styles.sortButtonUnSelectedStyle} onPress={() => this.updateSort('shadowsize', !currentSort.shadowSize)}><Text>{"Shadow Size"}</Text></Button>
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

export default connect(mapStateToProps, { updateFishSort })(
  FishSortOptions
);
