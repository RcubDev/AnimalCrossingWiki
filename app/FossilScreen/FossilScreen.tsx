
import { FossilScreenProps } from '../../models/MainScreenModels/FossilScreen/FossilScreenProps';
import React, { Component } from 'react';
import { FossilScreenState } from '../../models/MainScreenModels/FossilScreen/FossilScreenState';
import { AsyncStorage, FlatList } from 'react-native';
import { Container } from 'native-base';
import { AppLoading } from 'expo';
import styles from './FossilScreen.styles'
import { connect } from 'react-redux';
import { ListHeader } from '../Shared/ListHeader';
import { GridItem } from '../Shared/GridItem';
import FossilImages from '../Images/FossilImages';
import { ItemModel, ItemSourceSheet } from '../../models/CollectionModelsV2/items';
import { updateItemDonated, updateFossilCollectionFromStorage } from "../../app/ReduxV2/CollectionActions";


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


    render() {

        const { navigation, updateItemDonated } = this.props;

        if (!this.state.isReady) {
            return <AppLoading />;
        }
        let fossils = this.props.appState.fossils.fossilCollection;
        fossils = this.FilterFossilByText(this.state.filterText, fossils);
        return (
            <Container>
                <ListHeader
                    setSearchText={this.setSearchText}
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
            </Container >
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
