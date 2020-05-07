import React, { Component, PureComponent } from "react";
import { FishScreenProps } from "../../../models/FishScreen/FishScreenProps";
import { connect } from "react-redux";
import { Text, ScrollView, Modal } from "react-native";
import MonthFilterSelection from "../../CritterFilterComponents/MonthFilterSelection";
import ShadowSizeFilterSelection from "./ShadowSizeFilterSelection";
import RarityFilterSelection from "../../CritterFilterComponents/RarityFilterSelection";
import LocationFilterSelection from "../../CritterFilterComponents/LocationFilterSelection";
import CaughtFilterSelection from "../../CritterFilterComponents/CaughtFilter";
import { updateFishFilter } from "../../Redux/CollectionActions";
import { AdvancedSortFilterFishModel } from "../../../models/FishScreen/AdvancedSortFilterFishModel";

class AdvancedFilterSortOptions extends PureComponent<FishScreenProps> {
  constructor(props: FishScreenProps) {
    super(props);
  }

  SetFishFilter = (filter: AdvancedSortFilterFishModel) => {
    this.props.updateFishFilter(filter);
  };
  
  render() {
    let currentFilterSettings = {
      currentFilterSettings: this.props.appState.fish.fishAdvancedSortFilter,
      updateFunction: this.SetFishFilter,
    }
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
        <MonthFilterSelection {...currentFilterSettings}></MonthFilterSelection>
        <ShadowSizeFilterSelection {...currentFilterSettings}></ShadowSizeFilterSelection>
        <RarityFilterSelection {...currentFilterSettings}></RarityFilterSelection>
        <LocationFilterSelection {...currentFilterSettings}></LocationFilterSelection>
        <CaughtFilterSelection {...currentFilterSettings}></CaughtFilterSelection>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { appState } = state;
  return { appState };
};

export default connect(mapStateToProps, { updateFishFilter })(
  AdvancedFilterSortOptions
);
