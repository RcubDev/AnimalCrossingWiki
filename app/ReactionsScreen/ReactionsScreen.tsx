import React, { Component } from "react";
import { GetDefaultFilterModelItem, Filter } from "../SharedLogic/Filter";
import { GetDefaultSortModelItem, Sort } from "../SharedLogic/Sort";
import { AsyncStorage, FlatList, Modal } from "react-native";
import { FilterModel } from "../../models/Filter/FilterModel";
import { SortModel } from "../../models/Sort/SortModel";
import { AppLoading } from "expo";
import { Container, View } from "native-base";
import { ListHeader } from "../Shared/ListHeader";
import { GridItem } from "../Shared/GridItem";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import FilterOptions from "../Shared/FilterOptions";
import { SortOptions } from "../Shared/SortOptions";
import styles from "./ReactionsScreenStyles";
import { connect } from "react-redux";
import { updateItemCatalogged, updateReactionCollectionFromStorage, updateModelObtained } from "../../app/ReduxV2/CollectionActions";
import { ReactionModel } from "../../models/CollectionModelsV2/reactions";
import { ReactionsScreenProps } from "../../models/MainScreenModels/ReactionsScreen/ReactionsScreenProps";
import { ReactionsScreenState } from "../../models/MainScreenModels/ReactionsScreen/ReactionsScreenState";


function titleCase(str: string) {
  let returnStr = str.toLowerCase().split(' ').map(function (word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
  return returnStr;
}

const items = (require('../../dataV2/reactions.json') as ReactionModel[])
  .map(x => { return { ...x, obtained: false, name: titleCase(x.name) } });

const defaultReactionsCollection: Array<ReactionModel> = items;


class ReactionsScreen extends Component<ReactionsScreenProps, ReactionsScreenState> {
  constructor(props: ReactionsScreenProps) {
    super(props);
    this.state = {
      isReady: false,
      filterText: '',
      showFilterModal: false,
      showSortModal: false,
      filter: {...GetDefaultFilterModelItem(), donated: undefined, obtained: false, notObtained: false},
      sort: {...GetDefaultSortModelItem(), sellPrice: undefined}
    };
  }

  async componentDidMount() {
    const storedReactions = await AsyncStorage.getItem('reactionsStore');
    if (storedReactions) {
      this.props.updateReactionCollectionFromStorage(JSON.parse(storedReactions));
    }
    else {
      this.props.updateReactionCollectionFromStorage(defaultReactionsCollection);
      await AsyncStorage.setItem('reactionsStore', JSON.stringify(defaultReactionsCollection));
    }
    this.setState({ isReady: true });
  }

  setFilter = (filter: FilterModel) => {
    this.setState({ filter });
  }

  setSort = (sort: SortModel) => {
    this.setState({ sort });
  }

  FilterReactionByText(text: string, reactions: Array<ReactionModel>): Array<ReactionModel> {
    let allReactions = reactions;
    let reactionsArray: Array<ReactionModel> = [];
    text = text.toLowerCase();
    reactionsArray = allReactions.filter(x => x.name.toLowerCase().startsWith(text));
    return reactionsArray;
  }

  showFilterModal = () => this.setState({ showFilterModal: !this.state.showFilterModal });
  showSortModal = () => this.setState({ showSortModal: !this.state.showSortModal });


  setSearchText = (text: string) => {
    this.setState({ filterText: text.toLowerCase() });
  };

  render() {

    const { navigation, updateModelObtained } = this.props;

    if (!this.state.isReady) {
        return <AppLoading />;
    }
    let reactions = this.props.appState.reactions.reactionCollection;
    reactions = Filter(this.state.filter, reactions, 0) as ReactionModel[];
    reactions = this.FilterReactionByText(this.state.filterText, reactions);
    reactions = Sort(this.state.sort, reactions) as ReactionModel[];
    return (
        <Container>
            <ListHeader
                setSearchText={this.setSearchText}
                showFilterModal={this.showFilterModal}
                showSortModal={this.showSortModal}
            />
            <FlatList
                data={reactions}
                renderItem={({ item }: { item: ReactionModel }) => (
                    <GridItem model={item} navigation={navigation} updateModelObtained={updateModelObtained} navigateTo={'reactionDetails'} images={undefined} styles={styles}/>
                )}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.flatListContainerContent}
                columnWrapperStyle={{
                    justifyContent: 'space-evenly',
                    flexDirection: 'row',
                }}
            ></FlatList>
            <Modal visible={this.state.showFilterModal} transparent={true} animationType='slide'>
                <View style={{ height: '50%' }}>
                    <TouchableWithoutFeedback onPress={() => { this.setState({ showFilterModal: false }) }} style={{ width: '100%', height: '100%' }}></TouchableWithoutFeedback>
                </View>
                <FilterOptions currentFilter={this.state.filter} setFilterModel={this.setFilter}></FilterOptions>
            </Modal>
            <Modal visible={this.state.showSortModal} transparent={true} animationType='slide'>
                <View style={{ height: '50%' }}>
                    <TouchableWithoutFeedback onPress={() => { this.setState({ showSortModal: false }) }} style={{ width: '100%', height: '100%' }}></TouchableWithoutFeedback>
                </View>
                <SortOptions currentSort={this.state.sort} setSortModel={this.setSort}></SortOptions>
            </Modal>
        </Container>
    )
}
}

const mapStateToProps = (state: any) => {
  const { appState } = state;
  return { appState };
};

export default connect(mapStateToProps, {
  updateReactionCollectionFromStorage,
  updateModelObtained
})(ReactionsScreen);
