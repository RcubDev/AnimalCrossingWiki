import React from "react";
import { Button, View, Text, Card, CardItem } from "native-base";
import styles from "../FishScreen/FishFilter/FishFilterOptionsStyles";
import { FilterProps } from "../../models/Filter/FilterProps";

export default function LocationFilterSelection(props: FilterProps) {
  let selection = props.currentFilter.location;
  let filterObj = props.currentFilter;
  let setLocation = (location: number) => {
    if (filterObj.location === location) {
      filterObj.location = -1;
    }
    else {
      filterObj.location = location;
    }
    props.setFilterModel(filterObj);
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
        <Button style={selection === 1 ? styles.locationButtonSelectedStyle : styles.locationButtonUnSelectedStyle} onPress={() => { setLocation(1) }}>
          <Text>{props.filterType === "Fish" ? "River" : "Trees"}</Text>
        </Button>
        <Button style={selection === 2 ? styles.locationButtonSelectedStyle : styles.locationButtonUnSelectedStyle} onPress={() => { setLocation(2) }}>
          <Text>{props.filterType === "Fish" ? "River (Mouth)" : "Rocks"}</Text>
        </Button>
        <Button style={selection === 3 ? styles.locationButtonSelectedStyle : styles.locationButtonUnSelectedStyle} onPress={() => { setLocation(3) }}>
          <Text>{props.filterType === "Fish" ? "River (Cliff)" : "Flying"}</Text>
        </Button>
        <Button style={selection === 4 ? styles.locationButtonSelectedStyle : styles.locationButtonUnSelectedStyle} onPress={() => { setLocation(4) }}>
          <Text>{props.filterType === "Fish" ? "Pond" : "Ground"}</Text>
        </Button>
        <Button style={selection === 5 ? styles.locationButtonSelectedStyle : styles.locationButtonUnSelectedStyle} onPress={() => { setLocation(5) }}>
        <Text>{props.filterType === "Fish" ? "Pier" : "On/Near Water"}</Text>
        </Button>
        <Button style={selection === 6 ? styles.locationButtonSelectedStyle : styles.locationButtonUnSelectedStyle} onPress={() => { setLocation(6) }}>
        <Text>{props.filterType === "Fish" ? "Sea" : "Other"}</Text>
        </Button>
      </CardItem>
    </Card>
  );
}
