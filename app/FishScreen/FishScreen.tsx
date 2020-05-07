import React, { Component } from "react";
import {View, Modal, AsyncStorage } from "react-native";
import fish from "../../data/fish.json";
import { Container} from "native-base";
import {
  FlatList,
  TouchableWithoutFeedback
} from "react-native-gesture-handler";
import { FishGridItem } from "./FishGridItem";
import { AppLoading } from "expo";
import styles from "./FishScreen.styles";
import { FishScreenProps } from "../../models/FishScreen/FishScreenProps";
import { FishScreenState } from "../../models/FishScreen/FishScreenState";
import { connect } from "react-redux";
import {
  updateFishCaught,
  updateFishDonated,
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
    const storedFish = await AsyncStorage.getItem("fishStore");
    if (storedFish) {
      this.props.updateFishCollectionFromStorage(JSON.parse(storedFish));
    } else {
      this.props.updateFishCollectionFromStorage(defaultFishCollection);
      await AsyncStorage.setItem(
        "fishStore",
        JSON.stringify(defaultFishCollection)
      );
    }
    this.setState({ isReady: true });
  }

  filterFishByText(text: string, fishes: Array<NewFishModel>): Array<NewFishModel> {
    let filteredFish: Array<NewFishModel> = [];
    if (text.includes("filter:")) {
      try {
        //Check matching parens before doing this. If they're not matching return no fish.
        let value = filterCollectionByTextSpecial(
          text.substr(7),
          fishes,
          this.props.userSettings.inGameTime.minutes
        );
        if (isListOfFish(value)) {
          filteredFish = value;
        }
      } catch {}
    } else {
      filteredFish = fishes.filter(fish =>
        fish.name.toLowerCase().startsWith(text)
      );
    }
    return filteredFish;
  }

  enableSortModal = () => this.setState({ showSortModal: true });

  enableFilterModal = () => this.setState({ showFilterModal: true });

  setFilterText = (text: string) =>
    this.setState({ filterText: text.toLowerCase() });

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    const { fish, navigation, updateFishCaught, updateFishDonated } = this.props;
    const { filterText } = this.state;
    const { fishCollection, fishAdvancedSortFilter, fishAdvancedSort } = fish;

    let fishItems = FilterAdvancedFish(fishAdvancedSortFilter, fishCollection);
    fishItems = this.filterFishByText(filterText, fishItems);
    fishItems = SortAdvancedFish(fishItems, fishAdvancedSort);

    return (
      <Container>
        <ListHeader
          enableFilterModal={this.enableFilterModal}
          enableSortModal={this.enableSortModal}
          setFilterText={this.setFilterText}
        />
        <FlatList data={fishItems} renderItem={({ item }: { item: NewFishModel }) => (
            <FishGridItem
              fish={item}
              nav={navigation}
              updateFishCaught={updateFishCaught}
              updateFishDonated={updateFishDonated}
            />
          )}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContainerContent}
          columnWrapperStyle={{
            justifyContent: "space-evenly",
            flexDirection: "row"
          }}
        ></FlatList>
        <Modal visible={this.state.showFilterModal} transparent={true} animationType="slide">
          <View style={{ height: "50%" }}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({ showFilterModal: false });
              }}
              style={{ width: "100%", height: "100%" }}
            ></TouchableWithoutFeedback>
          </View>
          <AdvancedFilterSortOptions></AdvancedFilterSortOptions>
        </Modal>
        <Modal
          visible={this.state.showSortModal}
          transparent={true}
          animationType="slide"
        >
          <View style={{ height: "50%" }}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({ showSortModal: false });
              }}
              style={{ width: "100%", height: "100%" }}
            ></TouchableWithoutFeedback>
          </View>
          <AdvancedSortOptions></AdvancedSortOptions>
        </Modal>
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
