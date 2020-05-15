import React, { Component, PureComponent } from "react";
import { connect } from "react-redux";
import { Text, ScrollView, Modal } from "react-native";
import MonthFilterSelection from "../../CritterFilterComponents/MonthFilterSelection";
import RarityFilterSelection from "../../CritterFilterComponents/RarityFilterSelection";
import LocationFilterSelection from "../../CritterFilterComponents/LocationFilterSelection";
import CaughtFilterSelection from "../../CritterFilterComponents/CaughtFilter";
import { updateBugFilter } from "../../Redux/CollectionActions";
import { BugScreenProps } from "../../../models/MainScreenModels/BugScreen/BugScreenProps";
import { AdvancedFilterBugModel } from "../../../models/Filter/AdvancedFilterBugModel";
import { FilterProps } from "../../../models/Filter/FilterProps";

class BugFilterOptions extends PureComponent<FilterProps> {
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
        <RarityFilterSelection {...this.props}></RarityFilterSelection>
        <LocationFilterSelection {...this.props}></LocationFilterSelection>
        <CaughtFilterSelection {...this.props}></CaughtFilterSelection>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { appState } = state;
  return { appState };
};

export default connect(mapStateToProps, { updateBugFilter })(
  BugFilterOptions
);
