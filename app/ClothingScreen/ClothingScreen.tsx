import React, { Component } from "react";
import { ClothingScreenProps } from "../../models/MainScreenModels/ClothingScreen/ClothingScreenProps";
import { ClothingScreenState } from "../../models/MainScreenModels/ClothingScreen/ClothingScreenState";
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
import styles from "./ClothingScreenStyles";
import { connect } from "react-redux";
import { updateItemCatalogged, updateClothingCollectionFromStorage } from "../ReduxV2/CollectionActions";


function titleCase(str: string) {
  let returnStr = str.toLowerCase().split(' ').map(function (word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
  return returnStr;
}

//lmaooooo
function IsClothingItem(sourceSheet: ItemSourceSheet){
  switch(sourceSheet){
      case ItemSourceSheet.Accessories:
      case ItemSourceSheet.Bags:
      case ItemSourceSheet.Bottoms:
      case ItemSourceSheet.DressUp:
      case ItemSourceSheet.Headwear:
      case ItemSourceSheet.Shoes:
      case ItemSourceSheet.Socks:
      case ItemSourceSheet.Tops:
      case ItemSourceSheet.Umbrellas: 
        return true;
      default:
        return false;
  }  

}

const items = (require('../../dataV2/items.json') as ItemModel[]).filter(x => IsClothingItem(x.sourceSheet) && x.catalog !== "Not in catalog")
  .map(x => { return { ...x, donated: undefined, catalogged: false, obtained: undefined, name: titleCase(x.name) } }).sort((a, b) => {
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  });

const defaultClothingsCollection: Array<ItemModel> = items;


class ClothingsScreen extends Component<ClothingScreenProps, ClothingScreenState> {
  constructor(props: ClothingScreenProps) {
    super(props);
    this.state = {
      isReady: false,
      filterText: '',
      showFilterModal: false,
      showSortModal: false,
      filter: {...GetDefaultFilterModelItem(), donated: undefined, catalogged: false, notCatalogged: false},
      sort: {...GetDefaultSortModelItem(), sellPrice: undefined }
    };
  }

  async componentDidMount() {
    const storedClothings = await AsyncStorage.getItem('clothingStore');
    if (storedClothings) {
      this.props.updateClothingCollectionFromStorage(JSON.parse(storedClothings));
    }
    else {
      this.props.updateClothingCollectionFromStorage(defaultClothingsCollection);
      await AsyncStorage.setItem('clothingStore', JSON.stringify(defaultClothingsCollection));
    }
    this.setState({ isReady: true });
  }

  setFilter = (filter: FilterModel) => {
    this.setState({ filter });
  }

  setSort = (sort: SortModel) => {
    this.setState({ sort });
  }

  FilterClothingByText(text: string, songs: Array<ItemModel>): Array<ItemModel> {
    return songs.filter(x => x.name.toLowerCase().startsWith(text));
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
    let clothings = this.props.appState.clothingItems.clothingCollection;
    if(this.props.route.params && this.props.route.params.category) {
      clothings = clothings.filter(x => x.sourceSheet === this.props.route.params.category);
    }
    if(this.props.route.params && this.props.route.params.labelTheme) {
      clothings = clothings.filter(x => x.variants[0].labelThemes).filter(x => (x.variants[0].labelThemes as string[]).includes(this.props.route.params.labelTheme));
    }
    clothings = Filter(this.state.filter, clothings, 0) as ItemModel[];
    clothings = this.FilterClothingByText(this.state.filterText, clothings);
    clothings = Sort(this.state.sort, clothings) as ItemModel[];
    return (
        <Container>
            <ListHeader
                setSearchText={this.setSearchText}
                showFilterModal={this.showFilterModal}
                showSortModal={this.showSortModal}
            />
            <FlatList
                data={clothings}
                renderItem={({ item }: { item: ItemModel }) => (
                    <GridItem model={item} navigation={navigation} updateItemCatalogged={updateItemCatalogged} navigateTo={'ClothingDetails'} images={undefined} styles={styles}/>
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
  updateClothingCollectionFromStorage,
  updateItemCatalogged
})(ClothingsScreen);
