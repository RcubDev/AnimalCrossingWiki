import React from "react";
import { Button, View, Text, Card, CardItem } from "native-base";
import styles from "../Shared/Styles/FilterOptionsStyles";
import { FilterProps } from "../../models/Filter/FilterProps";

export default function RarityFilterSelection(props: FilterProps) {
  let selection = props.currentFilter.rarity;
  let filterObj = props.currentFilter;
  let setRarity = (rarity: number) => {
    if(filterObj.rarity === rarity){
        filterObj.rarity = -1;
    }
    else {
        filterObj.rarity = rarity;
    }
    props.setFilterModel(filterObj);
};
  
  return (
    <Card>
      <CardItem style={{ flex: 1, justifyContent: "space-between" }}>
        <Text>{"Filter By Rarity"}</Text>
        <Button style={{ borderRadius: 20 }} onPress={() => {setRarity(-1)}}>
          <Text>{"Reset"}</Text>
        </Button>
      </CardItem>
      <CardItem
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Button style={selection === 1 ? styles.rarityButtonSelectedStyle : styles.rarityButtonUnSelectedStyle} onPress={() => {setRarity(1)}}>
          <Text>Common</Text>
        </Button>
        <Button style={selection === 2 ? styles.rarityButtonSelectedStyle : styles.rarityButtonUnSelectedStyle} onPress={() => {setRarity(2)}}>
          <Text>Uncommon</Text>
        </Button>
        <Button style={selection === 3 ? styles.rarityButtonSelectedStyle : styles.rarityButtonUnSelectedStyle} onPress={() => {setRarity(3)}}>
          <Text>Rare</Text>
        </Button>
        <Button style={selection === 4 ? styles.rarityButtonSelectedStyle : styles.rarityButtonUnSelectedStyle} onPress={() => {setRarity(4)}}>
          <Text>Ultra Rare</Text>
        </Button>
      </CardItem>
    </Card>
  );
}
