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
import styles from "./VillagersScreenStyles";
import { updateVillagerInVillage, updateVillagerCollectionFromStorage, updateVillagerFavorited, updateCreatureCaught } from "../../app/ReduxV2/CollectionActions";
import { VillagerModel } from "../../models/CollectionModelsV2/villagers";
import { VillagersScreenProps } from "../../models/MainScreenModels/VillagersScreen/VillagersScreenProps";
import { VillagersScreenState } from "../../models/MainScreenModels/VillagersScreen/VillagersScreenState";
import { connect } from "react-redux";


function titleCase(str: string) {
  let returnStr = str.toLowerCase().split(' ').map(function (word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
  return returnStr;
}

const items = (require('../../dataV2/villagers.json') as VillagerModel[])
  .map(x => { return { ...x, inVillage: false, favorited: false, name: titleCase(x.name) } });

const defaultVillagersCollection: Array<VillagerModel> = items;


class VillagersScreen extends Component<VillagersScreenProps, VillagersScreenState> {
  constructor(props: VillagersScreenProps) {
    super(props);
    this.state = {
      isReady: false,
      filterText: '',
      showFilterModal: false,
      showSortModal: false,
      filter: {...GetDefaultFilterModelItem(), donated: undefined,  },
      sort: {...GetDefaultSortModelItem(), sellPrice: undefined}
    };
  }

  async componentDidMount() {            
    const storedVillagers = await AsyncStorage.getItem('villagerStore');
    if (storedVillagers) {
      this.props.updateVillagerCollectionFromStorage(JSON.parse(storedVillagers));
    }
    else {
      this.props.updateVillagerCollectionFromStorage(defaultVillagersCollection);
      await AsyncStorage.setItem('villagerStore', JSON.stringify(defaultVillagersCollection));
    }
    this.setState({ isReady: true });
  }

  setFilter = (filter: FilterModel) => {
    this.setState({ filter });
  }

  setSort = (sort: SortModel) => {
    this.setState({ sort });
  }

  FilterVillagersByText(text: string, songs: Array<VillagerModel>): Array<VillagerModel> {
    let allSongs = songs;
    let songArray: Array<VillagerModel> = [];
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

    const { navigation, updateVillagerFavorited, updateVillagerInVillage  } = this.props;

    if (!this.state.isReady) {
        return <AppLoading />;
    }
    let villagers = this.props.appState.villagers.villagerCollection;
    if(this.props.route && this.props.route.params && this.props.route.params.personality !== undefined) {
      villagers = villagers.filter(x => x.personality === this.props.route.params.personality);
    }
    else if (this.props.route && this.props.route.params && this.props.route.params.species !== undefined) {
      villagers = villagers.filter(x => x.species === this.props.route.params.species);
    }
    villagers = Filter(this.state.filter, villagers, 0) as VillagerModel[];
    villagers = this.FilterVillagersByText(this.state.filterText, villagers);
    villagers = Sort(this.state.sort, villagers) as VillagerModel[];
    return (
        <Container>
            <ListHeader
                setSearchText={this.setSearchText}
                showFilterModal={this.showFilterModal}
                showSortModal={this.showSortModal}
            />
            <FlatList
                data={villagers}
                renderItem={({ item }: { item: VillagerModel }) => (
                    <GridItem model={item} navigation={navigation} updateVillagerFavorited={updateVillagerFavorited} updateVillagerInVillage={updateVillagerInVillage} navigateTo={'VillagerDetails'} images={undefined} styles={styles}/>
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
  updateVillagerCollectionFromStorage,
  updateVillagerFavorited,
  updateVillagerInVillage,
})(VillagersScreen);
