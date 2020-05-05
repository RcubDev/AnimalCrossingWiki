import React from "react";
import { Button, View, Text, Card, CardItem } from "native-base";
import styles from "./AdvancedFilterSortOptionsStyles";
import { FilterProps } from "../../models/Filter/FilterProps";

export default function MonthFilterSelection(props: FilterProps) {
  let filterObj = props.currentFilterSettings;

  let setCatchableNow = (catchableNow: boolean) => {
    filterObj.catchableNow = catchableNow;
    if (catchableNow) {
      setMonths(0, false);
    }
    props.updateFunction(filterObj);
  }

  let setMonths = (month: number, selected: boolean) => {
    if(selected && filterObj.catchableNow){
      filterObj.catchableNow = false;
    }
    switch (month) {
      case 0:
        filterObj.jan = selected;
        filterObj.feb = selected;
        filterObj.mar = selected;
        filterObj.apr = selected;
        filterObj.may = selected;
        filterObj.jun = selected;
        filterObj.jul = selected;
        filterObj.aug = selected;
        filterObj.sep = selected;
        filterObj.oct = selected;
        filterObj.nov = selected;
        filterObj.dec = selected;
        break;
      case 1:
        filterObj.jan = selected;
        break;
      case 2:
        filterObj.feb = selected;
        break;
      case 3:
        filterObj.mar = selected;
        break;
      case 4:
        filterObj.apr = selected;
        break;
      case 5:
        filterObj.may = selected;
        break;
      case 6:
        filterObj.jun = selected;
        break;
      case 7:
        filterObj.jul = selected;
        break;
      case 8:
        filterObj.aug = selected;
        break;
      case 9:
        filterObj.sep = selected;
        break;
      case 10:
        filterObj.oct = selected;
        break;
      case 11:
        filterObj.nov = selected;
        break;
      case 12:
        filterObj.dec = selected;
        break;
    }
    props.updateFunction(filterObj);
  };

  return (
    <Card>
      <CardItem style={{ flex: 1, justifyContent: "space-between" }}>
        <Text>{"Filter By Month"}</Text>
        <Button
          style={{ borderRadius: 20 }}
          onPress={() => setMonths(0, false)}
        >
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
        <Button
          style={
            filterObj.jan
              ? styles.monthButtonSelectedStyle
              : styles.monthButtonUnSelectedStyle
          }
          onPress={() => {
            setMonths(1, !filterObj.jan);
          }}
        >
          <Text>Jan</Text>
        </Button>
        <Button
          style={
            filterObj.feb
              ? styles.monthButtonSelectedStyle
              : styles.monthButtonUnSelectedStyle
          }
          onPress={() => {
            setMonths(2, !filterObj.feb);
          }}
        >
          <Text>Feb</Text>
        </Button>
        <Button
          style={
            filterObj.mar
              ? styles.monthButtonSelectedStyle
              : styles.monthButtonUnSelectedStyle
          }
          onPress={() => {
            setMonths(3, !filterObj.mar);
          }}
        >
          <Text>Mar</Text>
        </Button>
        <Button
          style={
            filterObj.apr
              ? styles.monthButtonSelectedStyle
              : styles.monthButtonUnSelectedStyle
          }
          onPress={() => {
            setMonths(4, !filterObj.apr);
          }}
        >
          <Text>Apr</Text>
        </Button>
        <Button
          style={
            filterObj.may
              ? styles.monthButtonSelectedStyle
              : styles.monthButtonUnSelectedStyle
          }
          onPress={() => {
            setMonths(5, !filterObj.may);
          }}
        >
          <Text>May</Text>
        </Button>
        <Button
          style={
            filterObj.jun
              ? styles.monthButtonSelectedStyle
              : styles.monthButtonUnSelectedStyle
          }
          onPress={() => {
            setMonths(6, !filterObj.jun);
          }}
        >
          <Text>Jun</Text>
        </Button>
        <Button
          style={
            filterObj.jul
              ? styles.monthButtonSelectedStyle
              : styles.monthButtonUnSelectedStyle
          }
          onPress={() => {
            setMonths(7, !filterObj.jul);
          }}
        >
          <Text>Jul</Text>
        </Button>
        <Button
          style={
            filterObj.aug
              ? styles.monthButtonSelectedStyle
              : styles.monthButtonUnSelectedStyle
          }
          onPress={() => {
            setMonths(8, !filterObj.aug);
          }}
        >
          <Text>Aug</Text>
        </Button>
        <Button
          style={
            filterObj.sep
              ? styles.monthButtonSelectedStyle
              : styles.monthButtonUnSelectedStyle
          }
          onPress={() => {
            setMonths(9, !filterObj.sep);
          }}
        >
          <Text>Sep</Text>
        </Button>
        <Button
          style={
            filterObj.oct
              ? styles.monthButtonSelectedStyle
              : styles.monthButtonUnSelectedStyle
          }
          onPress={() => {
            setMonths(10, !filterObj.oct);
          }}
        >
          <Text>Oct</Text>
        </Button>
        <Button
          style={
            filterObj.nov
              ? styles.monthButtonSelectedStyle
              : styles.monthButtonUnSelectedStyle
          }
          onPress={() => {
            setMonths(11, !filterObj.nov);
          }}
        >
          <Text>Nov</Text>
        </Button>
        <Button
          style={
            filterObj.dec
              ? styles.monthButtonSelectedStyle
              : styles.monthButtonUnSelectedStyle
          }
          onPress={() => {
            setMonths(12, !filterObj.dec);
          }}
        >
          <Text>Dec</Text>
        </Button>
        <Button
          style={
            filterObj.catchableNow
              ? styles.catchableNowSelectedStyle
              : styles.catchableNowUnSelectedStyle
          }
          onPress={() => { setCatchableNow(!filterObj.catchableNow) }}>
          <Text>{"Catchable Now"}</Text>
        </Button>
      </CardItem>
    </Card>
  );
}
