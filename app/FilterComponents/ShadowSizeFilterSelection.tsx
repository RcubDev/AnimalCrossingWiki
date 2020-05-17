import React from "react";
import { Button, Text, Card, CardItem } from "native-base";
import styles from "../Shared/Styles/FilterOptionsStyles";
import { FilterProps } from "../../models/Filter/FilterProps";

export default function ShadowSizeFilterSelection(props: FilterProps) {
    let selection = props.currentFilter.shadowSize;
    let filterObj = props.currentFilter;
    let setFilterShadowSize = (shadowSize: number) => {
        if(filterObj.shadowSize === shadowSize){
            filterObj.shadowSize = -1;
        }
        else {
            filterObj.shadowSize = shadowSize;
        }
        props.setFilterModel(filterObj);
    };
  return (
    <Card>
      <CardItem style={{ flex: 1, justifyContent: "space-between" }}>
        <Text>{"Filter By Shadow Size"}</Text>
        <Button style={{ borderRadius: 20 }} onPress={() => {setFilterShadowSize(-1)}}>
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
        <Button style={selection !== 1 ? styles.shadowSizeButtonUnSelectedStyle : styles.shadowSizeButtonSelectedStyle} onPress={() => {setFilterShadowSize(1)}}>
          <Text>Tiny</Text>
        </Button>
        <Button style={selection !== 2 ? styles.shadowSizeButtonUnSelectedStyle : styles.shadowSizeButtonSelectedStyle} onPress={() => {setFilterShadowSize(2)}}>
          <Text>Small</Text>
        </Button>
        <Button style={selection !== 3 ? styles.shadowSizeButtonUnSelectedStyle : styles.shadowSizeButtonSelectedStyle} onPress={() => {setFilterShadowSize(3)}}>
                      <Text>Medium</Text>
        </Button>
        <Button style={selection !== 4 ? styles.shadowSizeButtonUnSelectedStyle : styles.shadowSizeButtonSelectedStyle} onPress={() => {setFilterShadowSize(4)}}>
                 <Text>Large</Text>
        </Button>
        <Button style={selection !== 5 ? styles.shadowSizeButtonUnSelectedStyle : styles.shadowSizeButtonSelectedStyle} onPress={() => {setFilterShadowSize(5)}}>
                <Text>Huge</Text>
        </Button>
        <Button style={selection !== 6 ? styles.shadowSizeButtonUnSelectedStyle : styles.shadowSizeButtonSelectedStyle} onPress={() => {setFilterShadowSize(6)}}>
                <Text>Gigantic</Text>
        </Button>
        <Button style={selection !== 7 ? styles.shadowSizeButtonUnSelectedStyle : styles.shadowSizeButtonSelectedStyle} onPress={() => {setFilterShadowSize(7)}}>
               <Text>Narrow</Text>
        </Button>
      </CardItem>
    </Card>
  );
}
