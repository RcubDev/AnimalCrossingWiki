import React, { Component } from 'react';
import { AsyncStorage, Modal } from 'react-native';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import creatures from '../../dataV2/creatures.json'
import {
  Container, View,
} from 'native-base';
import { AppLoading } from 'expo';
import styles from '../Shared/Screen.styles';
import { BugScreenProps } from '../../models/MainScreenModels/BugScreen/BugScreenProps';
import { BugScreenState } from '../../models/MainScreenModels/BugScreen/BugScreenState';
import { connect } from 'react-redux';
import BugImages from '../Images/BugImages';
import { updateCreatureCaught, updateCreatureDonated, updateBugCollectionFromStorage } from "../../app/ReduxV2/CollectionActions";
import { ListHeader } from '../Shared/ListHeader';
import { GridItem } from '../Shared/GridItem';
import { CreatureModel, SourceSheet, CreatureSize, CreatureColor, LightingType, Season, Thern, CreatureWeather } from '../../models/CollectionModelsV2/creatures';
import FilterOptions from '../FishScreen/FishFilter/FilterOptions';
import { FilterModel } from '../../models/Filter/FilterModel';
import { Filter } from '../AdvancedFilterLogic/FishFilterAdvanced';

function titleCase(str: string) {
  let returnStr = str.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
    return returnStr;
}

const defaultBugCollection: Array<CreatureModel> = creatures.filter(x => x.sourceSheet === "Bugs").map(x => {
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
class BugScreen extends Component<BugScreenProps, BugScreenState> {
  focusListener: any;
  constructor(props: BugScreenProps) {
    super(props);
    this.state = {
      isReady: false,
      filterText: '',
      showFilterModal: false,
      showSortModal: false,
      filter: {
        caught: false,
        donated: false,
        notCaught: false,
        notDonated: false,
        availableNow: false,
        location: -1,
        rarity: -1,
        value: 0,
        catchableNow: false,
        shadowSize: undefined,
        monthsAvailable: {
          jan: false,
          feb: false,
          mar: false,
          apr: false,
          may: false,
          jun: false,
          jul: false,
          aug: false,
          sep: false,
          oct: false,
          nov: false,
          dec: false
        }
      }    
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
  setFilter = (filter: FilterModel) => {
    this.setState({filter});
  }



  filterBugByText(text: string, bugs: Array<CreatureModel>): Array<CreatureModel> {
    var allBug = bugs;
    //read text until key word -- if no key words involved assume name
    let bugArray: Array<CreatureModel> = [];
    let filterSpecial = text.includes('filter:');
    text = text.toLowerCase();
    if (filterSpecial) {
      // try {
      //   //Check matching parens before doing this. If they're not matching return no bug.
      //   let value = filterCollectionByTextSpecial(
      //     text.substr(7),
      //     bugs,
      //     this.props.appState.userSettings.inGameTime.minutes
      //   );
      //   if (isListOfBug(value)) {
      //     bugArray = value;
      //   }
      // } catch (err) {
      //   bugArray = [];
      // }
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

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    const { navigation, updateCreatureCaught, updateCreatureDonated } = this.props;

    let visibleBugList: Array<CreatureModel> = this.props.appState.bugs.bugCollection;
    //Use common critter filter    
    visibleBugList = Filter(this.state.filter, visibleBugList, 0) as CreatureModel[];
    visibleBugList = this.filterBugByText(this.state.filterText, visibleBugList);
    //visibleBugList = SortBugs(visibleBugList, this.props.appState.bug.bugAdvancedSort);
    return (
      <Container>
        <ListHeader
          showSortModal={this.showSortModal}
          showFilterModal={this.showFilterModal}
          setSearchText={this.setSearchText}
        />
        <FlatList
          data={visibleBugList}
          renderItem={({ item }: { item: CreatureModel }) => (
            <GridItem model={item} navigation={navigation} updateCaught={updateCreatureCaught} updateDonated={updateCreatureDonated} navigateTo={'BugDetails'} images={BugImages} styles={styles}/>
          )}
          numColumns={3}
          keyExtractor={(item: CreatureModel, index: number) => index.toString()}
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
        {/* <Modal visible={this.state.showSortModal} transparent={true} animationType='slide'>
          <View style={{ height: '50%' }}>
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
  updateCreatureCaught,
  updateCreatureDonated,
  updateBugCollectionFromStorage
})(BugScreen);
