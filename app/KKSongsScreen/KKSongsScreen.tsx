import React, { Component } from "react";
import { KKSongScreenProps } from "../../models/MainScreenModels/KKSongsScreen/KKSongsScreenProps";
import { KKSongScreenState } from "../../models/MainScreenModels/KKSongsScreen/KKSongScreenState";
import { ItemSourceSheet, ItemModel } from "../../models/CollectionModelsV2/items";
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
import styles from "./KKSongScreenStyles";
import { connect } from "react-redux";
import { updateItemCatalogged, updateKKSongCollectionFromStorage } from "../../app/ReduxV2/CollectionActions";


function titleCase(str: string) {
  let returnStr = str.toLowerCase().split(' ').map(function (word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
  returnStr = returnStr.replace("k", "K");
  return returnStr;
}

const items = (require('../../dataV2/items.json') as ItemModel[]).filter(x => x.sourceSheet === ItemSourceSheet.Music && x.catalog !== "Not in catalog")
  .map(x => { return { ...x, donated: undefined, catalogged: false, obtained: undefined, name: titleCase(x.name) } });

const defaultKKSongsCollection: Array<ItemModel> = items;


class KKSongsScreen extends Component<KKSongScreenProps, KKSongScreenState> {
  constructor(props: KKSongScreenProps) {
    super(props);
    this.state = {
      isReady: false,
      filterText: '',
      showFilterModal: false,
      showSortModal: false,
      filter: {...GetDefaultFilterModelItem(), donated: undefined, catalogged: false, notCatalogged: false},
      sort: {...GetDefaultSortModelItem(), sellPrice: undefined}
    };
  }

  async componentDidMount() {
    const storedKKSongs = await AsyncStorage.getItem('kkSongStore');
    if (storedKKSongs) {
      this.props.updateKKSongCollectionFromStorage(JSON.parse(storedKKSongs));
    }
    else {
      this.props.updateKKSongCollectionFromStorage(defaultKKSongsCollection);
      await AsyncStorage.setItem('kkSongStore', JSON.stringify(defaultKKSongsCollection));
    }
    this.setState({ isReady: true });
  }

  setFilter = (filter: FilterModel) => {
    this.setState({ filter });
  }

  setSort = (sort: SortModel) => {
    this.setState({ sort });
  }

  FilterKKSongByText(text: string, songs: Array<ItemModel>): Array<ItemModel> {
    let allSongs = songs;
    let songArray: Array<ItemModel> = [];
    text = text.toLowerCase();
    songArray = allSongs.filter(x => x.name.toLowerCase().startsWith(text));
    return songArray;
  }

  showFilterModal = () => this.setState({ showFilterModal: !this.state.showFilterModal });
  showSortModal = () => this.setState({ showSortModal: !this.state.showSortModal });


  setSearchText = (text: string) => {
    this.setState({ filterText: text.toLowerCase() });
  };

  render() {

    const { navigation, updateItemCatalogged } = this.props;

    if (!this.state.isReady) {
        return <AppLoading />;
    }
    let kkSongs = this.props.appState.kkSongs.kkSongCollection;
    kkSongs = Filter(this.state.filter, kkSongs, 0) as ItemModel[];
    kkSongs = this.FilterKKSongByText(this.state.filterText, kkSongs);
    kkSongs = Sort(this.state.sort, kkSongs) as ItemModel[];
    return (
        <Container>
            <ListHeader
                setSearchText={this.setSearchText}
                showFilterModal={this.showFilterModal}
                showSortModal={this.showSortModal}
            />
            <FlatList
                data={kkSongs}
                renderItem={({ item }: { item: ItemModel }) => (
                    <GridItem model={item} navigation={navigation} updateItemCatalogged={updateItemCatalogged} navigateTo={'kkSongDetails'} images={undefined} styles={styles}/>
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
  updateKKSongCollectionFromStorage,
  updateItemCatalogged
})(KKSongsScreen);
