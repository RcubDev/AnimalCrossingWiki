import React from "react";
import {
    Header,
    Item,
    Input,
    Button,
} from "native-base";
import { Text } from "react-native";


export const ListHeader = ({ showSortModal, setSearchText, showFilterModal }: any) => <Header>
    <Item style={{ flex: 1 }}>
        {showSortModal && (<Button
            transparent
            onPress={showSortModal}
        >
            <Text> Sort </Text>
        </Button>)}
        <Input
            autoCorrect={false}
            placeholder="Filter"
            onChangeText={(text) => setSearchText(text)}
            returnKeyType={"done"}
        ></Input>
        {showFilterModal && (<Button
            transparent
            onPress={showFilterModal}
        >
            <Text> Filters </Text>
        </Button>)}
    </Item>
</Header>

export interface ListHeaderProps {

}

