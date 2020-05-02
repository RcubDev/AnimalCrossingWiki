import React from "react";
import { Button, View, Text, Card, CardItem } from "native-base";
import styles from "./AdvancedFilterSortOptionsStyles";
import { FilterProps } from "../../models/Filter/FilterProps";

export default function LocationFilterSelection(props: FilterProps) {
  let selection = props.currentFilterSettings.location;
  let filterObj = props.currentFilterSettings;
  let setLocation = (location: number) => {
    if(filterObj.location === location){
        filterObj.location = -1;
    }
    else {
        filterObj.location = location;
    }
    props.updateFunction(filterObj);
};
  return (
    <Card>
      <CardItem style={{ flex: 1, justifyContent: "space-between" }}>
        <Text>{"Filter By Location"}</Text>
        <Button style={{ borderRadius: 20 }} onPress={() => setLocation(-1)}>
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
        <Button style={selection === 1 ? styles.locationButtonSelectedStyle : styles.locationButtonUnSelectedStyle} onPress={() => {setLocation(1)}}>
          <Text>River</Text>
        </Button>
        <Button style={selection === 2 ? styles.locationButtonSelectedStyle : styles.locationButtonUnSelectedStyle} onPress={() => {setLocation(2)}}>
          <Text>River (Mouth)</Text>
        </Button>
        <Button style={selection === 3 ? styles.locationButtonSelectedStyle : styles.locationButtonUnSelectedStyle} onPress={() => {setLocation(3)}}>
          <Text>River (Cliff)</Text>
        </Button>
        <Button style={selection === 4 ? styles.locationButtonSelectedStyle : styles.locationButtonUnSelectedStyle} onPress={() => {setLocation(4)}}>
          <Text>Pond</Text>
        </Button>
        <Button style={selection === 5 ? styles.locationButtonSelectedStyle : styles.locationButtonUnSelectedStyle} onPress={() => {setLocation(5)}}>
          <Text>Pier</Text>
        </Button>
        <Button style={selection === 6 ? styles.locationButtonSelectedStyle : styles.locationButtonUnSelectedStyle} onPress={() => {setLocation(6)}}>
          <Text>Sea</Text>
        </Button>
      </CardItem>
    </Card>
  );
}
