import React, { Component } from "react";
import { Text, View, Image, Platform, Modal, AsyncStorage } from "react-native";
import bugs from "../../data/bugs.json";
// import { Grid } from 'native-base';
import {
  Container,
  Header,
  Item,
  Input,
  Button,
} from "native-base";
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { AppLoading } from "expo";
import styles from "./BugScreen.styles";
import { BugScreenProps } from "../../models/MainScreenModels/BugScreen/BugScreenProps";
import { BugScreenState } from "../../models/MainScreenModels/BugScreen/BugScreenState";
import { connect } from "react-redux";
import {
  updateBugCaught,
  updateBugDonated,
  updateBugFilter,
  updateBugCollectionFromStorage
} from "../Redux/CollectionActions";
import BugImages from '../Images/BugImages';
import { BugModel } from "../../models/CollectionModels/BugModel";
import { filterCollectionByTextSpecial } from "../Filter/Filter";
import { isListOfBug } from "../Filter/FilterTypes";
import AdvancedFilterSortOptions from "../FishScreen/FishFilter/FishFilterOptions";
import AdvancedSortOptions from "../FishScreen/FishSort/FishSortOptions";
import { FilterCritters } from "../AdvancedFilterLogic/CritterFilterAdvanced";
import { FilterBugs } from "../AdvancedFilterLogic/BugFilterAdvanced";
import { SortBugs } from "../AdvancedSortLogic/BugSortAdvanced";
import { BugGridItem } from "./BugGridItem/BugGridItem";
import FishFilterOptions from "../FishScreen/FishFilter/FishFilterOptions";
import BugFilterOptions from "./BugFilter/BugFilterOptions";
import BugSortOptions from "./BugSort/BugSortOptions";
import { ListHeader } from "../Shared/ListHeader";
import { GridItem } from "../Shared/GridItem";

const defaultBugCollection: Array<BugModel> = bugs.bugs;


class BugScreen extends Component<BugScreenProps, BugScreenState> {
  focusListener: any;
  constructor(props: BugScreenProps) {
    super(props);
    this.state = {
      isReady: false,
      filterText: "",
      showFilterModal: false,
      showSortModal: false
    };
  }

  async componentDidMount() {
    const storedBug = await AsyncStorage.getItem('bugStore');
    if (storedBug) {
      this.props.updateBugCollectionFromStorage(JSON.parse(storedBug));
    }
    else {
      this.props.updateBugCollectionFromStorage(defaultBugCollection);
      await AsyncStorage.setItem('bugStore', JSON.stringify(defaultBugCollection));
    }
    this.setState({ isReady: true });
  }

  SetItemCaught = (caught: boolean, index: number) => {
    this.props.updateBugCaught({ caught, index });
  };

  SetItemDonated = (donated: boolean, index: number) => {
    this.props.updateBugDonated({ donated, index });
  };

  filterBugByText(text: string, bugs: Array<BugModel>): Array<BugModel> {
    var allBug = bugs;
    //read text until key word -- if no key words involved assume name
    let bugArray: Array<BugModel> = [];
    let filterSpecial = text.includes("filter:");
    text = text.toLowerCase();
    if (filterSpecial) {
      try {
        //Check matching parens before doing this. If they're not matching return no bug.
        let value = filterCollectionByTextSpecial(
          text.substr(7),
          bugs,
          this.props.appState.userSettings.inGameTime.minutes
        );
        if (isListOfBug(value)) {
          bugArray = value;
        }
      } catch (err) {
        bugArray = [];
      }
    } else {
      bugArray = allBug.filter((x) => x.name.toLowerCase().startsWith(text));
    }
    return bugArray;
  }

  showSortModal = () => this.setState({ showSortModal: true });
  showFilterModal = () => this.setState({ showFilterModal: true });
  setSearchText = (text: string) => {
    this.setState({ filterText: text.toLowerCase() });
  };

  //End Region

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    const { navigation, updateBugCaught, updateBugDonated } = this.props;

    let visibleBugList = this.props.appState.bug.bugCollection;
    //Use common critter filter    
    visibleBugList = FilterBugs(this.props.appState.bug.bugAdvancedFilter, visibleBugList);
    visibleBugList = this.filterBugByText(this.state.filterText, visibleBugList);
    visibleBugList = SortBugs(visibleBugList, this.props.appState.bug.bugAdvancedSort);
    return (
      <Container>
        <ListHeader
          showSortModal={this.showSortModal}
          showfilterModal={this.showFilterModal}
          setSearchText={this.setSearchText}
        />
        <FlatList
          data={visibleBugList}
          renderItem={({ item }: { item: BugModel; index: number; }) => (
            <GridItem model={item} navigation={navigation} updateCaught={updateBugCaught} updateDonated={updateBugDonated} navigateTo={'BugDetails'} images={BugImages} />
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
          <BugFilterOptions></BugFilterOptions>
        </Modal>
        <Modal visible={this.state.showSortModal} transparent={true} animationType="slide">
          <View style={{ height: "50%" }}>
            <TouchableWithoutFeedback onPress={() => { this.setState({ showSortModal: false }) }} style={{ width: '100%', height: '100%' }}></TouchableWithoutFeedback>
          </View>
          <BugSortOptions></BugSortOptions>
        </Modal> */}
      </Container>
    );
  }
}
const mapStateToProps = (state: any) => {
  const { appState } = state;
  return { appState };
};

export default connect(mapStateToProps, {
  updateBugCaught,
  updateBugDonated,
  updateBugCollectionFromStorage
})(BugScreen);
