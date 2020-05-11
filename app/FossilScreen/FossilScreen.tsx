
import fossils from "../../data/fossils.json";
import { SortCritters } from "../AdvancedSortLogic/SortAdvanced";
import { FossilScreenProps } from "../../models/MainScreenModels/FossilScreen/FossilScreenProps";
import { FossilModel } from '../../models/CollectionModels/FossilModel';
import React, { Component } from "react";
import { FossilScreenState } from "../../models/MainScreenModels/FossilScreen/FossilScreenState";
import { AsyncStorage, FlatList } from "react-native";
import { Item, Input, Button, Text, Container, Header } from "native-base";
import { FossilGridItem } from "./FossilGridItem/FossilGridItem";
import { AppLoading } from "expo";
import styles from './FossilScreen.styles'
import { connect } from "react-redux";
import {
    updateFossilDonated,
    updateFossilCollectionFromStorage
} from "../Redux/CollectionActions";
import { ListHeader } from "../Shared/ListHeader";
import { GridItem } from '../Shared/GridItem';
import FossilImages from "../Images/FossilImages";


const defaultFossilCollection: Array<FossilModel> = fossils.fossils;


class FossilScreen extends Component<FossilScreenProps, FossilScreenState> {
    constructor(props: FossilScreenProps) {
        super(props);
        this.state = {
            isReady: false,
            filterText: ""
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

    SetItemDonated = (donated: boolean, id: number) => {
        this.props.updateFossilDonated({ donated, index: id });
    }

    FilterFossilByText(text: string, fossils: Array<FossilModel>): Array<FossilModel> {
        let allFossils = fossils;
        let fossilArray: Array<FossilModel> = [];
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

        const { navigation, updateFossilDonated } = this.props;

        if (!this.state.isReady) {
            return <AppLoading />;
        }
        let fossils = this.props.appState.fossil.fossilCollection;
        fossils = this.FilterFossilByText(this.state.filterText, fossils);
        return (
            <Container>
                <ListHeader
                    setSearchText={this.setSearchText}
                />
                <FlatList
                    data={fossils}
                    renderItem={({ item }: { item: FossilModel; index: number; }) => (
                        <GridItem model={item} navigation={navigation} updateDonated={updateFossilDonated} navigateTo={'FossilDetails'} images={FossilImages} />
                    )}
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.flatListContainerContent}
                    columnWrapperStyle={{
                        justifyContent: "space-evenly",
                        flexDirection: "row",
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
    updateFossilDonated
})(FossilScreen);
