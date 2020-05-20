import React, { PureComponent, ReactNode } from "react";
import { VillagersScreenProps } from "../../models/MainScreenModels/VillagersScreen/VillagersScreenProps";
import { View, Text } from "native-base";
import { Image } from 'react-native';
import { connect } from "react-redux";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import styles from './VillagerCategoryScreenStyles';
import { VillagerModel, Personality } from "../../models/CollectionModelsV2/villagers";

const allVillager = require('../../dataV2/villagers.json') as VillagerModel[];
const villagerPersonalities = (allVillager.map(x => x.personality).filter((value, index, self) => self.indexOf(value) === index) as string[]).sort((a, b) => {
    return a < b ? -1 : a > b ? 1 : 0;
});
const villagerSpecies = (allVillager.map(x => x.species).filter((value, index, self) => self.indexOf(value) === index) as string[]).sort((a, b) => {
    return a < b ? -1 : a > b ? 1 : 0;
});
function createPersonalityItems(props: VillagersScreenProps): ReactNode[] {
    let personalityBoxes = [];
    for (let i = 0; i < villagerPersonalities.length; i++) {
        personalityBoxes.push(
            <View key={`villagerPersonalityOuterBox${i}`} style={i % 2 === 0 ? styles.villagerPersonalityOuterBoxEven : styles.villagerPersonalityOuterBoxOdd}>
                <TouchableOpacity key={`villagerPersonalityTouchable${i}`} style={styles.villagerPersonalityTouchable} onPress={() => { props.navigation.navigate("Villagers", { personality: villagerPersonalities[i] }) }} >
                    <Text key={`villagerPersonalityText${i}`} style={styles.villagerPersonalityText}>{villagerPersonalities[i]}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return personalityBoxes;
}

function createSpeciesItems(props: VillagersScreenProps): ReactNode[] {
    let personalityBoxes = [];
    for (let i = 0; i < villagerSpecies.length; i++) {
        let currentSpeciesList = allVillager.filter(x => x.species === villagerSpecies[i]);
        personalityBoxes.push(
            <View key={`villagerSpeciesOuterBox${i}`} style={i % 2 === 0 ? styles.villagerPersonalityOuterBoxEven : styles.villagerPersonalityOuterBoxOdd}>
                <TouchableOpacity key={`villagerSpeciesTouchable${i}`} style={styles.villagerPersonalityTouchable} onPress={() => { props.navigation.navigate("Villagers", { species: villagerSpecies[i] }) }}>
                    <Image style={{ width: 50, height: 50 }} source={{ uri: currentSpeciesList[Math.floor(Math.random() * currentSpeciesList.length)].iconImage }}></Image>
                    <Text key={`villagerSpeciesText${i}`} style={styles.villagerPersonalityText}>{villagerSpecies[i]}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return personalityBoxes;
}

class VillagersCategoryScreen extends PureComponent<VillagersScreenProps> {
    constructor(props: VillagersScreenProps) {
        super(props);
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={{ padding: 20, alignItems: 'center' }}>
                    <View style={{ width: '90%' }}>
                        <TouchableOpacity style={{ borderColor: 'grey', borderWidth: 2, borderRadius: 5 }} onPress={() => this.props.navigation.navigate("Villagers")}>
                            <Text style={{ textAlign: 'center' }}>{"All Villagers"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '90%', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, padding: 20, borderColor: 'grey', borderWidth: 2, borderRadius: 5 }}>
                        {createPersonalityItems(this.props)}
                    </View>
                    <View style={{ width: '90%', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, padding: 20, borderColor: 'grey', borderWidth: 2, borderRadius: 5 }}>
                        {createSpeciesItems(this.props)}
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state: any) => {
    const { appState } = state;
    return { appState };
};

export default connect(mapStateToProps)(VillagersCategoryScreen);
