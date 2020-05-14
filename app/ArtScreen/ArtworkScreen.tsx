
import artworks from '../../data/artwork.json';
import { ArtworkScreenProps } from '../../models/MainScreenModels/ArtworkScreen/ArtworkScreenProps';
import { ArtworkModel } from '../../models/CollectionModels/ArtworkModel';
import React, { Component } from 'react';
import { ArtworkScreenState } from '../../models/MainScreenModels/ArtworkScreen/ArtworkScreenState';
import { AsyncStorage, FlatList } from 'react-native';
import { Item, Input, Button, Text, Container, Header } from 'native-base';
import { AppLoading } from 'expo';
import styles from './ArtworkScreenStyles'
import { connect } from 'react-redux';
import { updateItemDonated, updateArtworkCollectionFromStorage } from "../../app/ReduxV2/CollectionActions";
import { ListHeader } from '../Shared/ListHeader';
import ArtworkImages from '../Images/ArtworkImages';
import { GridItem } from '../Shared/GridItem';
import { ItemModel, ItemSourceSheet } from '../../models/CollectionModelsV2/items';

function titleCase(str: string) {
    console.log('title case');
    let returnStr = str.toLowerCase().split(' ').map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
    console.log(returnStr);
    return returnStr;
  }


const items = (require('../../dataV2/items.json') as ItemModel[]).filter(x => x.sourceSheet === ItemSourceSheet.Art)
    .map(x => { return {...x, donated: false, catalogged: false, name: titleCase(x.name)} });

const defaultArtworkCollection: Array<ItemModel> = items;


class ArtworkScreen extends Component<ArtworkScreenProps, ArtworkScreenState> {
    constructor(props: ArtworkScreenProps) {
        super(props);
        this.state = {
            isReady: false,
            filterText: ''
        };
    }

    async componentDidMount() {
        const storedArtworks = await AsyncStorage.getItem('artworkStore');
        if (storedArtworks) {
            this.props.updateArtworkCollectionFromStorage(JSON.parse(storedArtworks));
        }
        else {
            console.log('artwork default');
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


    render() {
        if (!this.state.isReady) {
            return <AppLoading />;
        }
        const { navigation, updateItemDonated } = this.props;

        let artworks = this.props.appState.artwork.artworkCollection;
        artworks = this.FilterArtworkByText(this.state.filterText, artworks);
        return (
            <Container>
                <ListHeader
                    setSearchText={this.setSearchText}
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
