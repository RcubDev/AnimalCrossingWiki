import { VillagerModel } from "../../../models/CollectionModelsV2/villagers";
import { ApplicationStateV2 } from "../../../models/ApplicationState/ApplicationStateV2";
import { NavigationScreenProp } from "react-navigation";
import { updateVillagerFavorited, updateVillagerCollectionFromStorage, updateVillagerInVillage } from "../../ReduxV2/CollectionActions";
import { connect } from "react-redux";
import React, { Component } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { View, Icon, CheckBox } from "native-base";
import { Image, Text } from 'react-native'
import styles from './VillagerDetailsScreenStyles'
interface VillagerDetailsProps {
    navigation: NavigationScreenProp<any>,
    appState: ApplicationStateV2
    updateVillagerFavorited: typeof updateVillagerFavorited,
    updateVillagerInVillage: typeof updateVillagerInVillage,

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
    villagerFavorited: boolean
}

class VillagerDetailsScreen extends Component<VillagerDetailsProps, VillagerDetailsState> {

    constructor(props: VillagerDetailsProps) {
        super(props);
        this.state = {
            villagerInVillage: this.props.route.params.model.inVillage,
            villagerFavorited: this.props.route.params.model.favorited
        }
    }

    setVillagerFavorited = () => {
        this.setState({ villagerFavorited: !this.props.route.params.model.favorited });
        this.props.updateVillagerFavorited({
            name: this.props.route.params.model.name,
            favorite: !this.props.route.params.model.favorited
        });
    }

    setVillagerInVillage = () => {
        this.setState({ villagerFavorited: !this.props.route.params.model.inVillage });
        this.props.updateVillagerInVillage({
            name: this.props.route.params.model.name,
            inVillage: !this.props.route.params.model.inVillage
        });
    }

    render() {
        let villagerModel = this.props.route.params.model;
        let villagerFavoriteSong = this.props.appState.kkSongs.kkSongCollection.find(x => x.name.toLowerCase() === villagerModel.favoriteSong.toLowerCase());
        return (
            <ScrollView contentContainerStyle={{ justifyContent: "center", alignItems: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ width: '90%', alignItems: 'center', margin: 20 }}>
                        <Text style={styles.textStyleName}>{villagerModel.name}</Text>
                        <Image source={{ uri: villagerModel.iconImage }} style={{ width: 150, height: 150 }}></Image>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
                            <CheckBox checked={this.state.villagerFavorited}></CheckBox>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '50%' }}>
                                <Icon type="FontAwesome5" name="calendar" style={{ color: 'black' }} />
                                <Text style={styles.calendarText}>{villagerModel.birthday}</Text>
                            </View>
                            <CheckBox checked={this.state.villagerInVillage}></CheckBox>
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
})(VillagerDetailsScreen);
