import React, { Fragment Component, PureComponent } from "react";
import { Text, ScrollView, Modal, View } from "react-native";
import MonthFilterSelection from "../../CritterFilterComponents/MonthFilterSelection";
import ShadowSizeFilterSelection from "./ShadowSizeFilterSelection";
import RarityFilterSelection from "../../CritterFilterComponents/RarityFilterSelection";
import LocationFilterSelection from "../../CritterFilterComponents/LocationFilterSelection";
import CaughtFilterSelection from "../../CritterFilterComponents/CaughtFilter";
import { FilterProps } from "../../../models/Filter/FilterProps";



export default class FilterOptions extends Component<FilterProps> {
  constructor(props: FilterProps) {
    super(props);
  }



  render() {

    const isCritter = true; // TODO
    const isFish = true;
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
        {isCritter && (
          <Fragment>
            <MonthFilterSelection {...this.props}></MonthFilterSelection>
            {isFish && <ShadowSizeFilterSelection {...this.props}></ShadowSizeFilterSelection>}
            <LocationFilterSelection {...this.props}></LocationFilterSelection>
            <RarityFilterSelection {...this.props}></RarityFilterSelection>
            <CaughtFilterSelection {...this.props}></CaughtFilterSelection>
          </Fragment>
        )}
      </ScrollView>
    );
  }
}
