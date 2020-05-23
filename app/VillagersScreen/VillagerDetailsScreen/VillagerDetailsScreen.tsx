import { VillagerModel } from "../../../models/CollectionModelsV2/villagers";
import { ApplicationStateV2 } from "../../../models/ApplicationState/ApplicationStateV2";
import { NavigationScreenProp } from "react-navigation";
import { updateVillagerFavorited, updateVillagerCollectionFromStorage, updateVillagerInVillage, updateKKSongCollectionFromStorage } from "../../ReduxV2/CollectionActions";
import { connect } from "react-redux";
import React, { Component } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { View, Icon, CheckBox } from "native-base";
import { Image, Text, AsyncStorage } from 'react-native'
import styles from './VillagerDetailsScreenStyles'
import { ItemModel, ItemSourceSheet } from "../../../models/CollectionModelsV2/items";
import { AppLoading } from "expo";
interface VillagerDetailsProps {
    navigation: NavigationScreenProp<any>,
    appState: ApplicationStateV2
    updateVillagerFavorited: typeof updateVillagerFavorited,
    updateVillagerInVillage: typeof updateVillagerInVillage,
    updateKKSongCollectionFromStorage: typeof updateKKSongCollectionFromStorage

    route: {
        key: string,
        name: string,
        params: {
            index: number,
            model: VillagerModel
        }
    }
}

interface VillagerDetailsState {
    villagerInVillage: boolean,
    villagerFavorited: boolean,
    isReady: boolean
}


const items = (require('../../../dataV2/items.json') as ItemModel[]).filter(x => x.sourceSheet === ItemSourceSheet.Music && x.catalog !== "Not in catalog")
  .map(x => { return { ...x, donated: undefined, catalogged: false, obtained: undefined, name: titleCase(x.name) } });

const defaultKKSongsCollection: Array<ItemModel> = items;

function titleCase(str: string) {
    let returnStr = str.toLowerCase().split(' ').map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
    returnStr = returnStr.replace("k.", "K.");
    return returnStr;
  }

class VillagerDetailsScreen extends Component<VillagerDetailsProps, VillagerDetailsState> {

    constructor(props: VillagerDetailsProps) {
        super(props);
        this.state = {
            villagerInVillage: this.props.route.params.model.inVillage,
            villagerFavorited: this.props.route.params.model.favorited,
            isReady: false
        }
    }

    async componentDidMount(){
        if(this.props.appState.kkSongs.kkSongCollection.length <= 0){
            const storedKKSongs = await AsyncStorage.getItem('kkSongStore');
            if (storedKKSongs) {
              this.props.updateKKSongCollectionFromStorage(JSON.parse(storedKKSongs));
            }
            else {
              this.props.updateKKSongCollectionFromStorage(defaultKKSongsCollection);
              await AsyncStorage.setItem('kkSongStore', JSON.stringify(defaultKKSongsCollection));
            }
        }

        this.setState({ isReady: true });
    }

    setVillagerFavorited = () => {
        this.setState({ villagerFavorited: !this.state.villagerFavorited });
        this.props.updateVillagerFavorited({
            name: this.props.route.params.model.name,
            favorite: this.state.villagerFavorited
        });
    }

    setVillagerInVillage = () => {
        this.setState({ villagerInVillage: !this.state.villagerInVillage });    
        this.props.updateVillagerInVillage({
            name: this.props.route.params.model.name,
            inVillage: this.state.villagerInVillage
        });
    }

    render() {
        let villagerModel = this.props.route.params.model;
        let villagerFavoriteSong = this.props.appState.kkSongs.kkSongCollection.find(x => x.name.toLowerCase() === villagerModel.favoriteSong.toLowerCase());
        if (!this.state.isReady) {
            return <AppLoading />;
        }
        return (
            <ScrollView contentContainerStyle={{ justifyContent: "center", alignItems: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ width: '90%', alignItems: 'center', margin: 20 }}>
                        <Text style={styles.textStyleName}>{villagerModel.name}</Text>
                        <Image source={{ uri: villagerModel.iconImage }} style={{ width: 150, height: 150 }}></Image>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
                            <CheckBox checked={this.state.villagerFavorited} onPress={this.setVillagerFavorited}></CheckBox>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '50%' }}>
                                <Icon type="FontAwesome5" name="calendar" style={{ color: 'black' }} />
                                <Text style={styles.calendarText}>{villagerModel.birthday}</Text>
                            </View>
                            <CheckBox checked={this.state.villagerInVillage} onPress={this.setVillagerInVillage}></CheckBox>
                        </View>
                    </View>
                    <View style={{ width: '90%', flexDirection: 'row', alignContent: 'center' }}>
                    </View>
                    <View style={{ width: '90%', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.personalitySpeciesText}>{`Personality: ${villagerModel.personality}`}</Text>
                            <Text style={styles.personalitySpeciesText}>{`Species: ${villagerModel.species}`}</Text>
                        </View>
                        <Text style={styles.personalitySpeciesText}>{`Catch Phrase: ${villagerModel.catchphrase}`}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center', marginTop: 20}}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.textStyle}>{`Favorite Song:\n ${villagerModel.favoriteSong}`}</Text>
                            <Image source={{ uri: villagerFavoriteSong?.variants[0].framedImage as string }}
                                style={{ width: 100, height: 100 }}></Image>
                        </View>
                        <View>
                            <Image source={{ uri: villagerModel.houseImage }} style={{ width: 200, height: 200 }}></Image>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state: any) => {
    const { appState } = state;
    return { appState };
};

export default connect(mapStateToProps, {
    updateVillagerFavorited,
    updateVillagerInVillage,
    updateKKSongCollectionFromStorage
})(VillagerDetailsScreen);
