import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import fish from '../../data/fish.json';
import creatures from '../../dataV2/creatures.json'
import {
  Container,
} from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
import { AppLoading } from 'expo';
import styles from '../Shared/Screen.styles';
import { FishScreenProps } from '../../models/MainScreenModels/FishScreen/FishScreenProps';
import { FishScreenState } from '../../models/MainScreenModels/FishScreen/FishScreenState';
import { connect } from 'react-redux';
import { NewFishModel } from '../../models/CollectionModels/NewFishModel';
import { filterCollectionByTextSpecial } from '../Filter/Filter';
import { isListOfFish } from '../Filter/FilterTypes';
import { FilterFish } from '../AdvancedFilterLogic/FishFilterAdvanced';
import { SortFish } from '../AdvancedSortLogic/FishSortAdvanced';
import { ListHeader } from '../Shared/ListHeader';
import { GridItem } from '../Shared/GridItem';
import FishImages from '../Images/FishImages';
import {updateItemCatalogged, updateCreatureCaught, updateCreatureDonated, updateItemDonated, updateFishCollectionFromStorage } from '../ReduxV2/CollectionActions'
import { CreatureModel, SourceSheet, CreatureSize, CreatureColor, LightingType, Season, ActiveMonths, Thern, CreatureWeather } from '../../models/CollectionModelsV2/creatures';

function titleCase(str: string) {
  let returnStr = str.toLowerCase().split(' ').map(function(word) {
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
      northern: x.activeMonths.northern.map(y => {return {...y, season: y.season as Season}}) as Thern[],
      southern: x.activeMonths.southern.map(y => {return {...y, season: y.season as Season}}) as Thern[]
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
    let filterSpecial = text.includes('filter:');
    text = text.toLowerCase();
    if (filterSpecial) {
      try {
        //Check matching parens before doing this. If they're not matching return no fish.
        let value = filterCollectionByTextSpecial(
          text.substr(7),
          fishes,
          this.props.appState.userSettings.inGameTime.minutes
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
    // fish = FilterFish(this.props.appState.fish.fishAdvancedSortFilter, fish);
    // fish = this.filterFishByText(this.state.filterText, fish);
    // fish = SortFish(fish, this.props.appState.fish.fishAdvancedSort);
    return (
      <Container>
        <ListHeader
          showSortModal={this.showSortModal}
          showfilterModal={this.showFilterModal}
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
              navigateTo={'FishDetails'}
              images={FishImages} 
              styles = { styles } />
          )}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContainerContent}
          columnWrapperStyle={{
            justifyContent: 'space-evenly',
            flexDirection: 'row',
          }}
        ></FlatList>
        {/* <Modal visible={this.state.showFilterModal} transparent={true} animationType='slide'>
          <View style={{ height: '50%' }}>
            <TouchableWithoutFeedback onPress={() => { this.setState({ showFilterModal: false }) }} style={{ width: '100%', height: '100%' }}></TouchableWithoutFeedback>
          </View>
          <AdvancedFilterSortOptions></AdvancedFilterSortOptions>
        </Modal>
        <Modal visible={this.state.showSortModal} transparent={true} animationType='slide'>
          <View style={{ height: '50%' }}>
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
  return { appState };
};

export default connect(mapStateToProps, {
  updateCreatureCaught,
  updateCreatureDonated,
  updateFishCollectionFromStorage
})(FishScreen);
