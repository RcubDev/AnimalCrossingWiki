import React from "react";
import { Button, Text, Card, CardItem } from "native-base";
import styles from "../Shared/Styles/FilterOptionsStyles";
import { FilterProps } from "../../models/Filter/FilterProps";
import { KeepPropertyUndefinedElseValue } from "../SharedLogic/Helper";

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
      case "obtained":
        if(filterObj.notObtained && value){
          filterObj.notObtained = false;
        }
        filterObj.obtained = value;
        break;
      case "notobtained":
        if(filterObj.obtained && value){
          filterObj.obtained = false;          
        }
        filterObj.notObtained = value;
        break;
      case "catalogged":
        if(filterObj.notCatalogged && value){
          filterObj.notCatalogged = false;
        }
        filterObj.catalogged = value;
        break;
      case "notcatalogged":
        if(filterObj.catalogged && value){
          filterObj.catalogged = false;
        }
        filterObj.notCatalogged = value;
        break;
      case "reset":
        filterObj.caught = KeepPropertyUndefinedElseValue(filterObj.caught, false);
        filterObj.notCaught =  KeepPropertyUndefinedElseValue(filterObj.notCaught, false);
        filterObj.donated =  KeepPropertyUndefinedElseValue(filterObj.donated, false);
        filterObj.notDonated =  KeepPropertyUndefinedElseValue(filterObj.notDonated, false);
        filterObj.obtained =  KeepPropertyUndefinedElseValue(filterObj.obtained, false);
        filterObj.notObtained =  KeepPropertyUndefinedElseValue(filterObj.notObtained, false);    
        filterObj.catalogged = KeepPropertyUndefinedElseValue(filterObj.catalogged, false);
        filterObj.notCatalogged = KeepPropertyUndefinedElseValue(filterObj.notCatalogged, false);  
        break;
    }
    props.setFilterModel(filterObj);
  };

  function getFilterByText(){
    if(props.currentFilter.obtained !== undefined){
      return "Filter By Obtained";
    }
    else if(props.currentFilter.catalogged !== undefined){
      return "Filter By Catalogged";
    }
    else if(props.currentFilter.caught !== undefined){
      return "Filter By Caught/Donated";
    }
    else if(props.currentFilter.donated !== undefined){
      return "Filter By Donated";
    }
  }

  return (
    <Card>
      <CardItem style={{ flex: 1, justifyContent: "space-between" }}>
        <Text>{getFilterByText()}</Text>
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
        { props.currentFilter.caught !== undefined && (<>
        <Button style={filterObj.caught ? styles.caughtSelectedStyle : styles.caughtUnSelectedStyle} onPress={() => {setFilterObj("caught", !filterObj.caught)}}>
          <Text>Caught</Text>
        </Button>
        <Button style={filterObj.notCaught ? styles.caughtSelectedStyle : styles.caughtUnSelectedStyle} onPress={() => {setFilterObj("notcaught", !filterObj.notCaught)}}>
          <Text>Not Caught</Text>
        </Button>
        </>)}
        { props.currentFilter.donated !== undefined &&
        (<><Button style={filterObj.donated ? styles.caughtSelectedStyle : styles.caughtUnSelectedStyle} onPress={() => {setFilterObj("donated", !filterObj.donated)}}>
          <Text>Donated</Text>
        </Button>
        <Button style={filterObj.notDonated ? styles.caughtSelectedStyle : styles.caughtUnSelectedStyle} onPress={() => {setFilterObj("notdonated", !filterObj.notDonated)}}>
          <Text>Not Donated</Text>
        </Button>
        </>)
        }
        { props.currentFilter.obtained !== undefined &&
        (<><Button style={filterObj.notObtained ? styles.caughtSelectedStyle : styles.caughtUnSelectedStyle} onPress={() => {setFilterObj("notobtained", !filterObj.notObtained)}}>
          <Text>Not Obtained</Text>
        </Button>
        <Button style={filterObj.obtained ? styles.caughtSelectedStyle : styles.caughtUnSelectedStyle} onPress={() => {setFilterObj("obtained", !filterObj.obtained)}}>
          <Text>Obtained</Text>
        </Button>
        </>)}
        { props.currentFilter.catalogged !== undefined &&
        (<><Button style={filterObj.notCatalogged ? styles.caughtSelectedStyle : styles.caughtUnSelectedStyle} onPress={() => {setFilterObj("notcatalogged", !filterObj.notCatalogged)}}>
          <Text>Not Catalogged</Text>
        </Button>
        <Button style={filterObj.catalogged ? styles.caughtSelectedStyle : styles.caughtUnSelectedStyle} onPress={() => {setFilterObj("catalogged", !filterObj.catalogged)}}>
          <Text>Catalogged</Text>
        </Button>
        </>)}
      </CardItem>
    </Card>
  );
}
