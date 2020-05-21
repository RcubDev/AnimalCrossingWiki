import React, { PureComponent, ReactNode } from "react";
import { VillagersScreenProps } from "../../models/MainScreenModels/VillagersScreen/VillagersScreenProps";
import { View, Text } from "native-base";
import { Image } from 'react-native';
import { connect } from "react-redux";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import styles from './ClothingCategoryScreenStyles';
import { ItemModel, ItemSourceSheet } from "../../models/CollectionModelsV2/items"
import { ClothingScreenProps } from "../../models/MainScreenModels/ClothingScreen/ClothingScreenProps";


//lmaooooo
function IsClothingItem(sourceSheet: ItemSourceSheet){
    switch(sourceSheet){
        case ItemSourceSheet.Accessories:
        case ItemSourceSheet.Bags:
        case ItemSourceSheet.Bottoms:
        case ItemSourceSheet.DressUp:
        case ItemSourceSheet.Headwear:
        case ItemSourceSheet.Shoes:
        case ItemSourceSheet.Socks:
        case ItemSourceSheet.Tops:
        case ItemSourceSheet.Umbrellas: 
          return true;
        default:
          return false;
    }  
  
  }

const allItems = require('../../dataV2/items.json') as ItemModel[];
const clothingCatagories = (allItems.filter(x => IsClothingItem(x.sourceSheet) && x.catalog !== "Not in catalog" && x.diy === false).map(x => x.sourceSheet).filter((value, index, self) => self.indexOf(value) === index) as string[]).sort((a, b) => {
    return a < b ? -1 : a > b ? 1 : 0;
});

function createClothingCategories(props: ClothingScreenProps): ReactNode[] {
    let clothingCategoryBoxes = [];
    for (let i = 0; i < clothingCatagories.length; i++) {
        let currentClothingList = allItems.filter(x => x.sourceSheet === clothingCatagories[i]);
        clothingCategoryBoxes.push(
            <View key={`clothingPersonalityOuterBox${i}`} style={i % 2 === 0 ? styles.clothingOuterBoxEven : styles.clothingOuterBoxOdd}>
                <TouchableOpacity key={`clothingPersonalityTouchable${i}`} style={styles.clothingTouchable} onPress={() => { props.navigation.navigate("Clothing", { category: clothingCatagories[i] }) }} >
                <Image style={{ width: 50, height: 50 }} source={{ uri: currentClothingList[Math.floor(Math.random() * currentClothingList.length)].variants[0].storageImage as string }}></Image>
                    <Text key={`clothingPersonalityText${i}`} style={styles.clothingText}>{clothingCatagories[i]}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return clothingCategoryBoxes;
}


class ClothingCategoryScreen extends PureComponent<ClothingScreenProps> {
    constructor(props: ClothingScreenProps) {
        super(props);
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={{ padding: 20, alignItems: 'center' }}>
                    <View style={{ width: '90%' }}>
                        <TouchableOpacity style={{ borderColor: 'grey', borderWidth: 2, borderRadius: 5 }} onPress={() => this.props.navigation.navigate("Clothing")}>
                            <Text style={{ textAlign: 'center' }}>{"All Clothing"}</Text>
                        </TouchableOpacity>
                    </View>                    
                    <View style={{ width: '90%', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, padding: 20, borderColor: 'grey', borderWidth: 2, borderRadius: 5 }}>
                        {createClothingCategories(this.props)}
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

export default connect(mapStateToProps)(ClothingCategoryScreen);