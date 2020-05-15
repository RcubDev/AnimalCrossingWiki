import React, { Component, PureComponent } from "react";
import { Text, ScrollView, Modal } from "react-native";
import MonthFilterSelection from "../../CritterFilterComponents/MonthFilterSelection";
import ShadowSizeFilterSelection from "./ShadowSizeFilterSelection";
import RarityFilterSelection from "../../CritterFilterComponents/RarityFilterSelection";
import LocationFilterSelection from "../../CritterFilterComponents/LocationFilterSelection";
import CaughtFilterSelection from "../../CritterFilterComponents/CaughtFilter";
import { FilterProps } from "../../../models/Filter/FilterProps";



export default class FishFilterOptions extends Component<FilterProps> {
  constructor(props: FilterProps) {
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
        <MonthFilterSelection {...this.props}></MonthFilterSelection>
        <ShadowSizeFilterSelection {...this.props}></ShadowSizeFilterSelection> 
        <RarityFilterSelection {...this.props}></RarityFilterSelection>
        <LocationFilterSelection {...this.props}></LocationFilterSelection>
        <CaughtFilterSelection {...this.props}></CaughtFilterSelection>
      </ScrollView>
    );
  }
}

