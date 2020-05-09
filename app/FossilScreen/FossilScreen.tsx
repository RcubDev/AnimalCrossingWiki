
import fossils from "../../data/fossils.json";
import { SortCritters } from "../AdvancedSortLogic/SortAdvanced";
import { FossilScreenProps } from "../../models/MainScreenModels/FossilScreen/FossilScreenProps";
import { FossilModel } from "../../models/CollectionModels/FossilModel";
import React, { Component } from "react";
import { FossilScreenState } from "../../models/MainScreenModels/FossilScreen/FossilScreenState";
import { AsyncStorage, FlatList } from "react-native";
import { Item, Input, Button, Text, Container, Header } from "native-base";
import { FossilGridItem } from "./FossilGridItem/FossilGridItem";
import { AppLoading } from "expo";
import styles from './FossilScreen.styles'
import { connect } from "react-redux";
import {
    updateFossilDonated,
    updateFossilCollectionFromStorage
  } from "../Redux/CollectionActions";


const defaultFossilCollection: Array<FossilModel> = fossils.fossils;


class FossilScreen extends Component<FossilScreenProps, FossilScreenState> {
    constructor(props: FossilScreenProps) {
        super(props);
        this.state = {
            isReady: false,
            filterText: ""
        };
    }

    async componentDidMount() {
        const storedFossils = await AsyncStorage.getItem('fossilStore');
        console.log(storedFossils);
        if (storedFossils) {
            this.props.updateFossilCollectionFromStorage(JSON.parse(storedFossils));
        }
        else {
            this.props.updateFossilCollectionFromStorage(defaultFossilCollection);
            await AsyncStorage.setItem('fossilStore', JSON.stringify(defaultFossilCollection));
        }
        this.setState({ isReady: true });
    }

    SetItemDonated = (donated: boolean, id: number) => {
        this.props.updateFossilDonated({ donated, index: id });
    }

    FilterFossilByText(text: string, fossils: Array<FossilModel>): Array<FossilModel> {
        let allFossils = fossils;
        let fossilArray: Array<FossilModel> = [];
        let filterSpecial = text.includes('filter:');
        text = text.toLowerCase();
        if (filterSpecial) {
            console.log('Implement');
        }
        else {
            fossilArray = allFossils.filter(x => x.name.toLowerCase().startsWith(text));
        }
        return fossilArray;
    }

    render() {
        if (!this.state.isReady) {
            return <AppLoading />;
        }
        let fossils = this.props.appState.fossil.fossilCollection;
        fossils = this.FilterFossilByText(this.state.filterText, fossils);
        return (
            <Container>
                <Header>
                    <Item style={{ flex: 1 }}>
                        <Button
                            transparent
                            onPress={() => {

                            }}
                        >
                            <Text> Sort </Text>
                        </Button>
                        <Input
                            autoCorrect={false}
                            placeholder="Filter"
                            onChangeText={(text: string) => {
                                this.setState({ filterText: text.toLowerCase() });
                            }}
                            returnKeyType={"done"}
                        ></Input>
                        <Button
                            transparent
                            onPress={() => {

                            }}
                        >
                            <Text> Filters </Text>
                        </Button>
                    </Item>
                </Header>
                <FlatList
                    data={fossils}
                    renderItem={({ item, index, }: { item: FossilModel; index: number; }) => (
                        <FossilGridItem {...{ model: { ...item }, nav: this.props.navigation, updateFossilDonated: this.props.updateFossilDonated }} />
                    )}
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.flatListContainerContent}
                    columnWrapperStyle={{
                        justifyContent: "space-evenly",
                        flexDirection: "row",
                    }}
                ></FlatList>
            </Container>
        )
    }
}
const mapStateToProps = (state: any) => {
    const { appState } = state;
    return { appState };
  };
  
  export default connect(mapStateToProps, {
    updateFossilCollectionFromStorage,
    updateFossilDonated
  })(FossilScreen);
  