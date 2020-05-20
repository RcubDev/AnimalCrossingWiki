import React, { Component } from "react";
import { FurnitureScreenProps } from "../../models/MainScreenModels/FurnitureScreen/FurnitureScreenProps";
import { FurnitureScreenState } from "../../models/MainScreenModels/FurnitureScreen/FurnitureScreenState";
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
import styles from "./FurnitureScreenStyles";
import { connect } from "react-redux";
import { updateItemCatalogged, updateFurnitureCollectionFromStorage } from "../../app/ReduxV2/CollectionActions";


function titleCase(str: string) {
  let returnStr = str.toLowerCase().split(' ').map(function (word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
  return returnStr;
}

//lmaooooo
function IsFurnitureItem(sourceSheet: ItemSourceSheet){
  switch(sourceSheet){
      case ItemSourceSheet.Fencing:
      case ItemSourceSheet.Floors:
      case ItemSourceSheet.Housewares:
      case ItemSourceSheet.Miscellaneous:
      case ItemSourceSheet.Photos:
      case ItemSourceSheet.Posters:
      case ItemSourceSheet.Rugs:
      case ItemSourceSheet.WallMounted:
      case ItemSourceSheet.Wallpapers:
        return true;
      default:
        return false;
  }  

}

const items = (require('../../dataV2/items.json') as ItemModel[]).filter(x => IsFurnitureItem(x.sourceSheet) && x.catalog !== "Not in catalog")
  .map(x => { return { ...x, donated: undefined, catalogged: false, obtained: undefined, name: titleCase(x.name) } }).sort((a, b) => {
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  });

const defaultFurnituresCollection: Array<ItemModel> = items;


class FurnituresScreen extends Component<FurnitureScreenProps, FurnitureScreenState> {
  constructor(props: FurnitureScreenProps) {
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
    const storedFurnitures = await AsyncStorage.getItem('furnitureStore');
    if (storedFurnitures) {
      this.props.updateFurnitureCollectionFromStorage(JSON.parse(storedFurnitures));
    }
    else {
      this.props.updateFurnitureCollectionFromStorage(defaultFurnituresCollection);
      await AsyncStorage.setItem('furnitureStore', JSON.stringify(defaultFurnituresCollection));
    }
    this.setState({ isReady: true });
  }

  setFilter = (filter: FilterModel) => {
    this.setState({ filter });
  }

  setSort = (sort: SortModel) => {
    this.setState({ sort });
  }

  FilterFurnitureByText(text: string, songs: Array<ItemModel>): Array<ItemModel> {
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
    let furnitures = this.props.appState.furnitureItems.furnitureCollection;
    furnitures = Filter(this.state.filter, furnitures, 0) as ItemModel[];
    furnitures = this.FilterFurnitureByText(this.state.filterText, furnitures);
    furnitures = Sort(this.state.sort, furnitures) as ItemModel[];
    return (
        <Container>
            <ListHeader
                setSearchText={this.setSearchText}
                showFilterModal={this.showFilterModal}
                showSortModal={this.showSortModal}
            />
            <FlatList
                data={furnitures}
                renderItem={({ item }: { item: ItemModel }) => (
                    <GridItem model={item} navigation={navigation} updateItemCatalogged={updateItemCatalogged} navigateTo={'furnitureDetails'} images={undefined} styles={styles}/>
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
  updateFurnitureCollectionFromStorage,
  updateItemCatalogged
})(FurnituresScreen);
