import React from "react";
import { Button, View, Text, Card, CardItem } from "native-base";
import styles from "../FishScreen/FishFilter/FishFilterOptionsStyles";
import { FilterProps } from "../../models/Filter/FilterProps";

export default function CaughtFilterSelection(props: FilterProps) {
  let filterObj = props.currentFilter;
  let setFilterObj = (type: string, value: boolean) => {
    switch (type) {
      case "caught":
        if(filterObj.notCaught && value){
          filterObj.notCaught = false;
        }
        filterObj.caught = value;
        break;
      case "notcaught":
        if(filterObj.caught && value){
          filterObj.caught = false;
        }
        filterObj.notCaught = value;        
        break;
      case "donated":
        if(filterObj.notDonated && value){
          filterObj.notDonated = false;
        }
        filterObj.donated = value;
        break;
      case "notdonated":
        if(filterObj.donated && value){
          filterObj.donated = false;
        }
        filterObj.notDonated = value;
        break;
      case "reset":
        filterObj.notDonated = false;
        filterObj.notCaught = false;
        filterObj.donated = false;
        filterObj.notDonated = false;
        break;
    }
    props.setFilterModel(filterObj);
  };

  return (
    <Card>
      <CardItem style={{ flex: 1, justifyContent: "space-between" }}>
        <Text>{"Filter By Caught/Donated"}</Text>
        <Button style={{ borderRadius: 20 }} onPress={() => {setFilterObj("reset", false)}}>
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
        { props.filterType === "Bug" || props.filterType === "Fish" && (<>
        <Button style={filterObj.caught ? styles.caughtSelectedStyle : styles.caughtUnSelectedStyle} onPress={() => {setFilterObj("caught", !filterObj.caught)}}>
          <Text>Caught</Text>
        </Button>
        <Button style={filterObj.notCaught ? styles.caughtSelectedStyle : styles.caughtUnSelectedStyle} onPress={() => {setFilterObj("notcaught", !filterObj.notCaught)}}>
          <Text>Not Caught</Text>
        </Button></>)}
        <Button style={filterObj.donated ? styles.caughtSelectedStyle : styles.caughtUnSelectedStyle} onPress={() => {setFilterObj("donated", !filterObj.donated)}}>
          <Text>Donated</Text>
        </Button>
        <Button style={filterObj.notDonated ? styles.caughtSelectedStyle : styles.caughtUnSelectedStyle} onPress={() => {setFilterObj("notdonated", !filterObj.notDonated)}}>
          <Text>Not Donated</Text>
        </Button>
      </CardItem>
    </Card>
  );
}
