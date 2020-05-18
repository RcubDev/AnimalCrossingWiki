import React, { Fragment, Component, PureComponent } from "react";
import { Text, ScrollView, Modal, View } from "react-native";
import MonthFilterSelection from "../FilterComponents/MonthFilterSelection";
import ShadowSizeFilterSelection from "../FilterComponents/ShadowSizeFilterSelection";
import RarityFilterSelection from "../FilterComponents/RarityFilterSelection";
import LocationFilterSelection from "../FilterComponents/LocationFilterSelection";
import CaughtFilterSelection from "../FilterComponents/CaughtFilter";
import { FilterProps } from "../../models/Filter/FilterProps";



export default class FilterOptions extends Component<FilterProps> {
  constructor(props: FilterProps) {
    super(props);
  }



  render() {

    const isFish = this.props.currentFilter.shadowSize !== undefined;
    const isCritter = this.props.currentFilter.caught !== undefined;
    const isMuseumDonatable = this.props.currentFilter.donated !== undefined;
    
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
        <>
        {isCritter && (
          <Fragment>
            <MonthFilterSelection {...this.props}></MonthFilterSelection>
            {isFish && <ShadowSizeFilterSelection {...this.props}></ShadowSizeFilterSelection>}
            <LocationFilterSelection {...this.props}></LocationFilterSelection>
            <RarityFilterSelection {...this.props}></RarityFilterSelection>
          </Fragment>
        )}
        {(isMuseumDonatable || this.props.currentFilter.obtained !== undefined || this.props.currentFilter.catalogged !== undefined)
         && <CaughtFilterSelection {...this.props}></CaughtFilterSelection>}
        </>
      </ScrollView>
    );
  }
}
