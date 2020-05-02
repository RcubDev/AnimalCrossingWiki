import React, { Component, PureComponent } from "react";
import { FishScreenProps } from "../../models/FishScreen/FishScreenProps";
import { connect } from "react-redux";
import {
  Container,
  Button,
  Card,
  CardItem,
  Grid,
  Row,
  Col,
  View,
  Header,
} from "native-base";
import { Text, ScrollView, Modal } from "react-native";
import styles from "./AdvancedFilterSortOptionsStyles";
import MonthFilterSelection from "./MonthFilterSelection";
import ShadowSizeFilterSelection from "./ShadowSizeFilterSelection";
import RarityFilterSelection from "./RarityFilterSelection";
import LocationFilterSelection from "./LocationFilterSelection";
import CaughtFilterSelection from "./CaughtFilter";
import { updateFishFilter } from "../Redux/CollectionActions";
import { AdvancedSortFilterFishModel } from "../../models/FishScreen/AdvancedSortFilterFishModel";

class AdvancedFilterSortOptions extends PureComponent<FishScreenProps> {
  constructor(props: FishScreenProps) {
    super(props);
  }

  SetFishFilter = (filter: AdvancedSortFilterFishModel) => {
    this.props.updateFishFilter(filter);
  };
  
  render() {
    let currentFilterSettings = {
      currentFilterSettings: this.props.collections.fish
        .fishAdvancedSortFilter,
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
  const { collections } = state;
  return { collections };
};

export default connect(mapStateToProps, { updateFishFilter })(
  AdvancedFilterSortOptions
);
