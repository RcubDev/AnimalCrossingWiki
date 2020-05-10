
import artworks from "../../data/artwork.json";
import { ArtworkScreenProps } from "../../models/MainScreenModels/ArtworkScreen/ArtworkScreenProps";
import { ArtworkModel } from "../../models/CollectionModels/ArtworkModel";
import React, { Component } from "react";
import { ArtworkScreenState } from "../../models/MainScreenModels/ArtworkScreen/ArtworkScreenState";
import { AsyncStorage, FlatList } from "react-native";
import { Item, Input, Button, Text, Container, Header } from "native-base";
import { AppLoading } from "expo";
import styles from './ArtworkScreenStyles'
import { connect } from "react-redux";
import {
    updateArtworkDonated,
    updateArtworkCollectionFromStorage
  } from "../Redux/CollectionActions";
import { ArtworkGridItem } from "./ArtGridItem/ArtworkGridItem";


const defaultArtworkCollection: Array<ArtworkModel> = artworks.artwork;


class ArtworkScreen extends Component<ArtworkScreenProps, ArtworkScreenState> {
    constructor(props: ArtworkScreenProps) {
        super(props);
        this.state = {
            isReady: false,
            filterText: ""
        };
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

    SetItemDonated = (donated: boolean, id: number) => {
        this.props.updateArtworkDonated({ donated, index: id });
    }

    FilterArtworkByText(text: string, artworks: Array<ArtworkModel>): Array<ArtworkModel> {
        let allArtworks = artworks;
        let artworkArray: Array<ArtworkModel> = [];
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

    render() {
        if (!this.state.isReady) {
            return <AppLoading />;
        }
        let artworks = this.props.appState.art.artworkCollection;
        artworks = this.FilterArtworkByText(this.state.filterText, artworks);
        return (
            <Container>
                <Header>
                    <Item style={{ flex: 1 }}>
                        <Button
                            transparent
                            onPress={() => {

                            }}
                        >
                            <Text> Sort </Text>
                        </Button>
                        <Input
                            autoCorrect={false}
                            placeholder="Filter"
                            onChangeText={(text: string) => {
                                this.setState({ filterText: text.toLowerCase() });
                            }}
                            returnKeyType={"done"}
                        ></Input>
                        <Button
                            transparent
                            onPress={() => {

                            }}
                        >
                            <Text> Filters </Text>
                        </Button>
                    </Item>
                </Header>
                <FlatList
                    data={artworks}
                    renderItem={({ item, index, }: { item: ArtworkModel; index: number; }) => (
                        <ArtworkGridItem {...{ model: { ...item }, nav: this.props.navigation, updateArtworkDonated: this.props.updateArtworkDonated }} />
                    )}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.flatListContainerContent}
                    columnWrapperStyle={{
                        justifyContent: "space-evenly",
                        flexDirection: "row",
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
    updateArtworkDonated
  })(ArtworkScreen);
  