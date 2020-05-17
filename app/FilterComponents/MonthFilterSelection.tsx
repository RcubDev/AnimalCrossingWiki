import React from "react";
import { Button, Text, Card, CardItem } from "native-base";
import styles from "../Shared/Styles/FilterOptionsStyles";
import { FilterProps } from "../../models/Filter/FilterProps";

export default function MonthFilterSelection(props: FilterProps) {
  let filterObj = props.currentFilter;

  let setCatchableNow = (catchableNow: boolean) => {
    filterObj.catchableNow = catchableNow;
    if (catchableNow) {
      setMonths(0, false);
    }
    props.setFilterModel(filterObj);
  };

  let setMonths = (month: number, selected: boolean) => {
    if (selected && filterObj.catchableNow) {
      // filterObj.monthsAvailable = false;
    }
    switch (month) {
      case 0:
        filterObj.monthsAvailable.jan = selected;
        filterObj.monthsAvailable.feb = selected;
        filterObj.monthsAvailable.mar = selected;
        filterObj.monthsAvailable.apr = selected;
        filterObj.monthsAvailable.may = selected;
        filterObj.monthsAvailable.jun = selected;
        filterObj.monthsAvailable.jul = selected;
        filterObj.monthsAvailable.aug = selected;
        filterObj.monthsAvailable.sep = selected;
        filterObj.monthsAvailable.oct = selected;
        filterObj.monthsAvailable.nov = selected;
        filterObj.monthsAvailable.dec = selected;
        break;
      case 1:
        filterObj.monthsAvailable.jan = selected;
        break;
      case 2:
        filterObj.monthsAvailable.feb = selected;
        break;
      case 3:
        filterObj.monthsAvailable.mar = selected;
        break;
      case 4:
        filterObj.monthsAvailable.apr = selected;
        break;
      case 5:
        filterObj.monthsAvailable.may = selected;
        break;
      case 6:
        filterObj.monthsAvailable.jun = selected;
        break;
      case 7:
        filterObj.monthsAvailable.jul = selected;
        break;
      case 8:
        filterObj.monthsAvailable.aug = selected;
        break;
      case 9:
        filterObj.monthsAvailable.sep = selected;
        break;
      case 10:
        filterObj.monthsAvailable.oct = selected;
        break;
      case 11:
        filterObj.monthsAvailable.nov = selected;
        break;
      case 12:
        filterObj.monthsAvailable.dec = selected;
        break;
    }

    props.setFilterModel(filterObj);
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
            filterObj.monthsAvailable !== undefined &&
            filterObj.monthsAvailable.jan
              ? styles.monthButtonSelectedStyle
              : styles.monthButtonUnSelectedStyle
          }
          onPress={() => {
            setMonths(1, !filterObj.monthsAvailable.jan);
          }}
        >
          <Text>Jan</Text>
        </Button>
        <Button
          style={
            filterObj.monthsAvailable !== undefined &&
            filterObj.monthsAvailable.feb
              ? styles.monthButtonSelectedStyle
              : styles.monthButtonUnSelectedStyle
          }
          onPress={() => {
            setMonths(2, !filterObj.monthsAvailable.feb);
          }}
        >
          <Text>Feb</Text>
        </Button>
        <Button
          style={
            filterObj.monthsAvailable.mar
              ? styles.monthButtonSelectedStyle
              : styles.monthButtonUnSelectedStyle
          }
          onPress={() => {
            setMonths(3, !filterObj.monthsAvailable.mar);
          }}
        >
          <Text>Mar</Text>
        </Button>
        <Button
          style={
            filterObj.monthsAvailable.apr
              ? styles.monthButtonSelectedStyle
              : styles.monthButtonUnSelectedStyle
          }
          onPress={() => {
            setMonths(4, !filterObj.monthsAvailable.apr);
          }}
        >
          <Text>Apr</Text>
        </Button>
        <Button
          style={
            filterObj.monthsAvailable.may
              ? styles.monthButtonSelectedStyle
              : styles.monthButtonUnSelectedStyle
          }
          onPress={() => {
            setMonths(5, !filterObj.monthsAvailable.may);
          }}
        >
          <Text>May</Text>
        </Button>
        <Button
          style={
            filterObj.monthsAvailable.jun
              ? styles.monthButtonSelectedStyle
              : styles.monthButtonUnSelectedStyle
          }
          onPress={() => {
            setMonths(6, !filterObj.monthsAvailable.jun);
          }}
        >
          <Text>Jun</Text>
        </Button>
        <Button
          style={
            filterObj.monthsAvailable.jul
              ? styles.monthButtonSelectedStyle
              : styles.monthButtonUnSelectedStyle
          }
          onPress={() => {
            setMonths(7, !filterObj.monthsAvailable.jul);
          }}
        >
          <Text>Jul</Text>
        </Button>
        <Button
          style={
            filterObj.monthsAvailable.aug
              ? styles.monthButtonSelectedStyle
              : styles.monthButtonUnSelectedStyle
          }
          onPress={() => {
            setMonths(8, !filterObj.monthsAvailable.aug);
          }}
        >
          <Text>Aug</Text>
        </Button>
        <Button
          style={
            filterObj.monthsAvailable.sep
              ? styles.monthButtonSelectedStyle
              : styles.monthButtonUnSelectedStyle
          }
          onPress={() => {
            setMonths(9, !filterObj.monthsAvailable.sep);
          }}
        >
          <Text>Sep</Text>
        </Button>
        <Button
          style={
            filterObj.monthsAvailable.oct
              ? styles.monthButtonSelectedStyle
              : styles.monthButtonUnSelectedStyle
          }
          onPress={() => {
            setMonths(10, !filterObj.monthsAvailable.oct);
          }}
        >
          <Text>Oct</Text>
        </Button>
        <Button
          style={
            filterObj.monthsAvailable.nov
              ? styles.monthButtonSelectedStyle
              : styles.monthButtonUnSelectedStyle
          }
          onPress={() => {
            setMonths(11, !filterObj.monthsAvailable.nov);
          }}
        >
          <Text>Nov</Text>
        </Button>
        <Button
          style={
            filterObj.monthsAvailable.dec
              ? styles.monthButtonSelectedStyle
              : styles.monthButtonUnSelectedStyle
          }
          onPress={() => {
            setMonths(12, !filterObj.monthsAvailable.dec);
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
          onPress={() => {
            setCatchableNow(!filterObj.catchableNow);
          }}
        >
          <Text>{"Catchable Now"}</Text>
        </Button>
      </CardItem>
    </Card>
  );
}
