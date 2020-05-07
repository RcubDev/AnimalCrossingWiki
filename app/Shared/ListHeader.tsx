import {
    Header,
    Item,
    Input,
    Button,
} from "native-base";
import { Text } from "react-native";
import React, { Component, useRef } from "react";


export interface ListHeaderProps {
    enableSortModal: any,
    enableFilterModal: any,
    setFilterText: any
}

export const ListHeader = ({ enableSortModal, setFilterText, enableFilterModal }: ListHeaderProps) => <Header>
    <Item style={{ flex: 1 }}>
        <Button
            transparent
            onPress={enableSortModal}>
            <Text> Sort </Text>
        </Button>
        <Input
            autoCorrect={false}
            placeholder="Filter"
            onChangeText={(text: string) => setFilterText(text)}
            returnKeyType={"done"}
        ></Input>
        <Button
            transparent
            onPress={enableFilterModal}>
            <Text> Filters </Text>
        </Button>
    </Item>
</Header>;

export default ListHeader;
