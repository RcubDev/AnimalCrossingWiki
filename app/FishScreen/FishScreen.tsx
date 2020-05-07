import React, { Component } from "react";
import { Text, View, Image, Platform, Modal, AsyncStorage } from "react-native";
import fish from "../../data/fish.json";
// import { Grid } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import {
    Container,
    Header,
    Item,
    Input,
    Button,
} from "native-base";
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { FishGridItem } from "./FishGridItem";
import { AppLoading } from "expo";
import styles from "./FishScreen.styles";
import { FishScreenProps } from "../../models/FishScreen/FishScreenProps";
import { FishScreenState } from "../../models/FishScreen/FishScreenState";
import { connect } from "react-redux";
import {
    updateFishCaught,
    updateFishDonated,
    updateFishFilter,
    updateFishCollectionFromStorage
} from "../Redux/CollectionActions";
import { NewFishModel } from "../../models/CollectionModels/NewFishModel";
import { filterCollectionByTextSpecial } from "../Filter/Filter";
import { isListOfFish } from "../Filter/FilterTypes";
import AdvancedFilterSortOptions from "../AdvancedFilter/AdvancedFilterSortOptions";
import { FilterAdvancedFish } from "../AdvancedFilter/FilterAdvanced";
import AdvancedSortOptions from "../AdvancedSort/AdvancedSortOptions";
import { SortAdvancedFish } from "../AdvancedSort/SortAdvanced";
import { ListHeader } from "../Shared/ListHeader";

const defaultFishCollection: Array<NewFishModel> = fish.fish;

class FishScreen extends Component<FishScreenProps, FishScreenState> {
    focusListener: any;
    constructor(props: FishScreenProps) {
        super(props);
        this.state = {
            isReady: false,
            filterText: "",
            showFilterModal: false,
            showSortModal: false
        };
    }

    async componentDidMount() {
        const storedFish = await AsyncStorage.getItem('fishStore');
        if (storedFish) {
            this.props.updateFishCollectionFromStorage(JSON.parse(storedFish));
        }
        else {
            this.props.updateFishCollectionFromStorage(defaultFishCollection);
            await AsyncStorage.setItem('fishStore', JSON.stringify(defaultFishCollection));
        }
        this.setState({ isReady: true });
    }

    filterFishByText(text: string, fishes: Array<NewFishModel>): Array<NewFishModel> {
        var allFish = fishes;
        //read text until key word -- if no key words involved assume name
        let fishArray: Array<NewFishModel> = [];
        let filterSpecial = text.includes("filter:");
        text = text.toLowerCase();
        if (filterSpecial) {
            try {
                //Check matching parens before doing this. If they're not matching return no fish.
                let value = filterCollectionByTextSpecial(
                    text.substr(7),
                    fishes,
                    this.props.userSettings.inGameTime.minutes
                );
                if (isListOfFish(value)) {
                    fishArray = value;
                }
            } catch (err) {
                fishArray = [];
            }
        } else {
            fishArray = allFish.filter((x) => x.name.toLowerCase().startsWith(text));
        }
        return fishArray;
    }

    enableSortModal = () => this.setState({ showSortModal: true });

    enableFilterModal = () => this.setState({ showFilterModal: true });

    setFilterText = (text: string) => this.setState({ filterText: text.toLowerCase() });

    render() {
        if (!this.state.isReady) {
            return <AppLoading />;
        }

        let fish = this.props.fish.fishCollection;
        fish = FilterAdvancedFish(this.props.fish.fishAdvancedSortFilter, fish);
        fish = this.filterFishByText(this.state.filterText, fish);
        fish = SortAdvancedFish(fish, this.props.fish.fishAdvancedSort);

        return (
            <Container>
                <ListHeader
                    enableFilterModal={this.enableFilterModal}
                    enableSortModal={this.enableSortModal}
                    setFilterText={this.setFilterText}
                />
                <FlatList
                    data={fish}
                    renderItem={({ item, index, }: { item: NewFishModel; index: number; }) => (
                        <FishGridItem {...{ model: { ...item }, nav: this.props.navigation, updateFishCaught: this.props.updateFishCaught, updateFishDonated: this.props.updateFishDonated, }} />
                    )}
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.flatListContainerContent}
                    columnWrapperStyle={{
                        justifyContent: "space-evenly",
                        flexDirection: "row",
                    }}
                ></FlatList>
                {/* <Modal visible={this.state.showFilterModal} transparent={true} animationType="slide">
          <View style={{ height: "50%" }}>
            <TouchableWithoutFeedback onPress={() => { this.setState({ showFilterModal: false }) }} style={{ width: '100%', height: '100%' }}></TouchableWithoutFeedback>
          </View>
          <AdvancedFilterSortOptions></AdvancedFilterSortOptions>
        </Modal>
        <Modal visible={this.state.showSortModal} transparent={true} animationType="slide">
          <View style={{ height: "50%" }}>
            <TouchableWithoutFeedback onPress={() => { this.setState({ showSortModal: false }) }} style={{ width: '100%', height: '100%' }}></TouchableWithoutFeedback>
          </View>
          <AdvancedSortOptions></AdvancedSortOptions>
        </Modal> */}
            </Container>
        );
    }
}
const mapStateToProps = (state: any) => {
    const { appState } = state;
    const { fish, userSettings } = appState;
    return { fish, userSettings };
};

export default connect(mapStateToProps, {
    updateFishCaught,
    updateFishDonated,
    updateFishCollectionFromStorage
})(FishScreen);
