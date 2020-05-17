
import { FossilScreenProps } from '../../models/MainScreenModels/FossilScreen/FossilScreenProps';
import React, { Component } from 'react';
import { FossilScreenState } from '../../models/MainScreenModels/FossilScreen/FossilScreenState';
import { AsyncStorage, FlatList, Modal } from 'react-native';
import { Container, View } from 'native-base';
import { AppLoading } from 'expo';
import styles from './FossilScreen.styles'
import { connect } from 'react-redux';
import { ListHeader } from '../Shared/ListHeader';
import { GridItem } from '../Shared/GridItem';
import FossilImages from '../Images/FossilImages';
import { ItemModel, ItemSourceSheet } from '../../models/CollectionModelsV2/items';
import { updateItemDonated, updateFossilCollectionFromStorage } from "../../app/ReduxV2/CollectionActions";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import FilterOptions from '../Shared/FilterOptions';
import { FilterModel } from '../../models/Filter/FilterModel';
import { Filter, GetDefaultFilterModelItem } from '../SharedLogic/Filter';
import { GetDefaultSortModelItem, Sort } from '../SharedLogic/Sort';
import { SortModel } from '../../models/Sort/AdvancedSortCritterModel';
import { SortOptions } from '../Shared/SortOptions';


function titleCase(str: string) {
    let returnStr = str.toLowerCase().split(' ').map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
    return returnStr;
  }

const items = (require('../../dataV2/items.json') as ItemModel[]).filter(x => x.sourceSheet === ItemSourceSheet.Fossils)
    .map(x => { return {...x, donated: false, catalogged: false, name: titleCase(x.name)} });

const defaultFossilCollection: Array<ItemModel> = items;


class FossilScreen extends Component<FossilScreenProps, FossilScreenState> {
    constructor(props: FossilScreenProps) {
        super(props);
        this.state = {
            isReady: false,
            filterText: '',
            showFilterModal: false,
            showSortModal: false,
            filter: GetDefaultFilterModelItem(),
            sort: GetDefaultSortModelItem()
        };
    }

    async componentDidMount() {
        const storedFossils = await AsyncStorage.getItem('fossilStore');
        if (storedFossils) {
            this.props.updateFossilCollectionFromStorage(JSON.parse(storedFossils));
        }
        else {
            this.props.updateFossilCollectionFromStorage(defaultFossilCollection);
            await AsyncStorage.setItem('fossilStore', JSON.stringify(defaultFossilCollection));
        }
        this.setState({ isReady: true });
    }

    SetItemDonated = (donated: boolean, name: string, type: "Fossil" | "Artwork") => {
        this.props.updateItemDonated({ donated, name, type});
    }

    setFilter = (filter: FilterModel) => {
        this.setState({ filter });
    }

    setSort = (sort: SortModel) => {
        this.setState({sort});
    }


    FilterFossilByText(text: string, fossils: Array<ItemModel>): Array<ItemModel> {
        let allFossils = fossils;
        let fossilArray: Array<ItemModel> = [];
        let filterSpecial = text.includes('filter:');
        text = text.toLowerCase();
        if (filterSpecial) {
            console.log('Implement');
        }
        else {
            fossilArray = allFossils.filter(x => x.name.toLowerCase().startsWith(text));
        }
        return fossilArray;
    }

    setSearchText = (text: string) => {
        this.setState({ filterText: text.toLowerCase() });
    };

    showFilterModal = () => this.setState({ showFilterModal: !this.state.showFilterModal });
    showSortModal = () => this.setState({ showSortModal: !this.state.showSortModal });

    render() {

        const { navigation, updateItemDonated } = this.props;

        if (!this.state.isReady) {
            return <AppLoading />;
        }
        let fossils = this.props.appState.fossils.fossilCollection;
        fossils = Filter(this.state.filter, fossils, 0) as ItemModel[];
        fossils = this.FilterFossilByText(this.state.filterText, fossils);
        fossils = Sort(this.state.sort, fossils) as ItemModel[];
        return (
            <Container>
                <ListHeader
                    setSearchText={this.setSearchText}
                    showFilterModal={this.showFilterModal}
                    showSortModal={this.showSortModal}
                />
                <FlatList
                    data={fossils}
                    renderItem={({ item }: { item: ItemModel }) => (
                        <GridItem model={item} navigation={navigation} updateItemDonated={updateItemDonated} navigateTo={'FossilDetails'} images={FossilImages} styles={styles}/>
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
    updateFossilCollectionFromStorage,
    updateItemDonated
})(FossilScreen);
