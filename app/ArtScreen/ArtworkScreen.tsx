
import artworks from '../../data/artwork.json';
import { ArtworkScreenProps } from '../../models/MainScreenModels/ArtworkScreen/ArtworkScreenProps';
import { ArtworkModel } from '../../models/CollectionModels/ArtworkModel';
import React, { Component } from 'react';
import { ArtworkScreenState } from '../../models/MainScreenModels/ArtworkScreen/ArtworkScreenState';
import { AsyncStorage, FlatList, Modal } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { Item, Input, Button, Text, Container, Header, View } from 'native-base';
import { AppLoading } from 'expo';
import styles from './ArtworkScreenStyles'
import { connect } from 'react-redux';
import { updateItemDonated, updateArtworkCollectionFromStorage } from "../../app/ReduxV2/CollectionActions";
import { ListHeader } from '../Shared/ListHeader';
import ArtworkImages from '../Images/ArtworkImages';
import { GridItem } from '../Shared/GridItem';
import { ItemModel, ItemSourceSheet } from '../../models/CollectionModelsV2/items';
import FilterOptions from '../FishScreen/FishFilter/FilterOptions';
import { FilterModel } from '../../models/Filter/FilterModel';
import { Filter } from '../AdvancedFilterLogic/FishFilterAdvanced';

function titleCase(str: string) {
    let returnStr = str.toLowerCase().split(' ').map(function (word) {
        return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
    return returnStr;
}


const items = (require('../../dataV2/items.json') as ItemModel[]).filter(x => x.sourceSheet === ItemSourceSheet.Art)
    .map(x => { return { ...x, donated: false, catalogged: false, name: titleCase(x.name) } });

const defaultArtworkCollection: Array<ItemModel> = items;


class ArtworkScreen extends Component<ArtworkScreenProps, ArtworkScreenState> {
    constructor(props: ArtworkScreenProps) {
        super(props);
        this.state = {
            isReady: false,
            filterText: '',
            showFilterModal: false,
            showSortModal: false,
            filter: {
                donated: false,
                notDonated: false,
                location: undefined,
                rarity: undefined,
                value: undefined,
                catchableNow: undefined,
                shadowSize: undefined,
                monthsAvailable: undefined,
                caught: undefined,
                notCaught: undefined,
                availableNow: undefined
            }
        };
    }

    setFilter = (filter: FilterModel) => {
        this.setState({ filter });
    }

    async componentDidMount() {
        const storedArtworks = await AsyncStorage.getItem('artworkStore');
        if (storedArtworks) {
            this.props.updateArtworkCollectionFromStorage(JSON.parse(storedArtworks));
        }
        else {
            this.props.updateArtworkCollectionFromStorage(defaultArtworkCollection);
            await AsyncStorage.setItem('artworkStore', JSON.stringify(defaultArtworkCollection));
        }
        this.setState({ isReady: true });
    }

    SetItemDonated = (donated: boolean, name: string, type: "Fossil" | "Artwork") => {
        this.props.updateItemDonated({ donated, name, type });
    }

    FilterArtworkByText(text: string, artworks: Array<ItemModel>): Array<ItemModel> {
        let allArtworks = artworks;
        let artworkArray: Array<ItemModel> = [];
        let filterSpecial = text.includes('filter:');
        text = text.toLowerCase();
        if (filterSpecial) {
            console.log('Implement');
        }
        else {
            artworkArray = allArtworks.filter(x => x.name.toLowerCase().startsWith(text));
        }
        return artworkArray;
    }

    setSearchText = (text: string) => {
        this.setState({ filterText: text.toLowerCase() });
    };

    showFilterModal = () => this.setState({ showFilterModal: !this.state.showFilterModal });

    render() {
        if (!this.state.isReady) {
            return <AppLoading />;
        }
        const { navigation, updateItemDonated } = this.props;

        let artworks = this.props.appState.artwork.artworkCollection;
        artworks = Filter(this.state.filter, artworks, 0) as ItemModel[];
        artworks = this.FilterArtworkByText(this.state.filterText, artworks);
        
        return (
            <Container>
                <ListHeader
                    setSearchText={this.setSearchText}
                    showFilterModal={this.showFilterModal}
                />
                <FlatList
                    data={artworks}
                    renderItem={({ item }: { item: ItemModel }) => (
                        <GridItem model={item} navigation={navigation} updateItemDonated={updateItemDonated} navigateTo={'ArtworkDetails'} images={ArtworkImages} styles={styles} />
                    )}
                    numColumns={2}
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
            </Container>
        )
    }
}
const mapStateToProps = (state: any) => {
    const { appState } = state;
    return { appState };
};

export default connect(mapStateToProps, {
    updateArtworkCollectionFromStorage,
    updateItemDonated
})(ArtworkScreen);
