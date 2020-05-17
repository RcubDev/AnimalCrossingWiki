import React, { Component } from 'react';
import { AsyncStorage, Modal } from 'react-native';
import creatures from '../../dataV2/creatures.json'
import {
  Container, View,
} from 'native-base';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AppLoading } from 'expo';
import styles from '../Shared/Styles/Screen.styles';
import { FishScreenProps } from '../../models/MainScreenModels/FishScreen/FishScreenProps';
import { FishScreenState } from '../../models/MainScreenModels/FishScreen/FishScreenState';
import { connect } from 'react-redux';
import { Filter, GetDefaultFilterModelCreature } from '../SharedLogic/Filter';
import { ListHeader } from '../Shared/ListHeader';
import { GridItem } from '../Shared/GridItem';
import FishImages from '../Images/FishImages';
import { updateCreatureCaught, updateCreatureDonated, updateFishCollectionFromStorage } from '../ReduxV2/CollectionActions'
import { CreatureModel, SourceSheet, CreatureSize, CreatureColor, LightingType, Season, ActiveMonths, Thern, CreatureWeather } from '../../models/CollectionModelsV2/creatures';
import { FilterModel } from '../../models/Filter/FilterModel';
import FilterOptions from '../Shared/FilterOptions';
import { SortModel } from '../../models/Sort/AdvancedSortCritterModel';
import { SortOptions } from '../Shared/SortOptions';
import { GetDefaultSortModelCreature, Sort } from '../SharedLogic/Sort';

function titleCase(str: string) {
  let returnStr = str.toLowerCase().split(' ').map(function (word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
  return returnStr;
}

const defaultFishCollection: Array<CreatureModel> = creatures.filter(x => x.sourceSheet === "Fish").map(x => {
  return {
    ...x,
    name: titleCase(x.name),
    sourceSheet: x.sourceSheet as SourceSheet,
    size: x.size as CreatureSize,
    colors: x.colors as CreatureColor[],
    lightingType: x.lightingType as LightingType,
    activeMonths: {
      northern: x.activeMonths.northern.map(y => { return { ...y, season: y.season as Season } }) as Thern[],
      southern: x.activeMonths.southern.map(y => { return { ...y, season: y.season as Season } }) as Thern[]
    },
    weather: x.weather as CreatureWeather,
    caught: false,
    donated: false,
    value: 0,
    id: 0,
  }
});

class FishScreen extends Component<FishScreenProps, FishScreenState> {
  constructor(props: FishScreenProps) {
    super(props);
    this.state = {
      isReady: false,
      filterText: '',
      showFilterModal: false,
      showSortModal: false,
      filter: GetDefaultFilterModelCreature(),
      sort: GetDefaultSortModelCreature()
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

  setFilter = (filter: FilterModel) => {
    this.setState({ filter });
  }

  setSort = (sort: SortModel) => {
    this.setState({ sort });
  }

  filterFishByText(text: string, fishes: Array<CreatureModel>): Array<CreatureModel> {
    var allFish = fishes;
    let fishArray: Array<CreatureModel> = [];
    fishArray = allFish.filter((x) => x.name.toLowerCase().startsWith(text));
    return fishArray;
  }

  showSortModal = () => this.setState({ showSortModal: !this.state.showSortModal });

  showFilterModal = () => this.setState({ showFilterModal: !this.state.showFilterModal });

  setSearchText = (text: string) => {
    this.setState({ filterText: text.toLowerCase() });
  };

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    const { navigation, updateCreatureCaught, updateCreatureDonated } = this.props;

    let fish = this.props.appState.fish.fishCollection;
    fish = Filter(this.state.filter, fish, this.props.appState.userSettings.inGameTimeOffsetInMinutes, this.props.appState.userSettings.isNorthernHemisphere) as CreatureModel[];
    fish = this.filterFishByText(this.state.filterText, fish);
    fish = Sort(this.state.sort, fish) as CreatureModel[];

    return (
      <Container>
        <ListHeader
          showSortModal={this.showSortModal}
          showFilterModal={this.showFilterModal}
          setSearchText={this.setSearchText}
        />
        <FlatList
          data={fish}
          renderItem={({ item }: { item: CreatureModel }) => (
            <GridItem
              model={item}
              navigation={navigation}
              updateCaught={updateCreatureCaught}
              updateDonated={updateCreatureDonated}
              navigateTo='DetailsScreen'
              type='fish'
              images={FishImages}
              styles={styles} />
          )}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContainerContent}
          columnWrapperStyle={styles.flatListColumnWrapper}
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
    );
  }
}
const mapStateToProps = (state: any) => {
  const { appState } = state;
  return { appState };
};

export default connect(mapStateToProps, {
  updateCreatureCaught,
  updateCreatureDonated,
  updateFishCollectionFromStorage
})(FishScreen);
