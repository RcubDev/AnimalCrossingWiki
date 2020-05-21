import React, { PureComponent, ReactNode } from "react";
import { VillagersScreenProps } from "../../models/MainScreenModels/VillagersScreen/VillagersScreenProps";
import { View, Text } from "native-base";
import { Image } from 'react-native';
import { connect } from "react-redux";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import styles from './FurnitureCategoryScreenStyles';
import { ItemModel, ItemSourceSheet } from "../../models/CollectionModelsV2/items"
import { FurnitureScreenProps } from "../../models/MainScreenModels/FurnitureScreen/FurnitureScreenProps";


//lmaooooo
function IsFurnitureItem(sourceSheet: ItemSourceSheet){
    switch(sourceSheet){
        case ItemSourceSheet.Fencing:
        case ItemSourceSheet.Floors:
        case ItemSourceSheet.Housewares:
        case ItemSourceSheet.Miscellaneous:
        case ItemSourceSheet.Photos:
        case ItemSourceSheet.Posters:
        case ItemSourceSheet.Rugs:
        case ItemSourceSheet.WallMounted:
        case ItemSourceSheet.Wallpapers:
          return true;
        default:
          return false;
    }  
  
  }

const allItems = require('../../dataV2/items.json') as ItemModel[];
const furnitureCatagories = (allItems.filter(x => IsFurnitureItem(x.sourceSheet) && x.catalog !== "Not in catalog" && x.diy === false).map(x => x.sourceSheet).filter((value, index, self) => self.indexOf(value) === index) as string[]).sort((a, b) => {
    return a < b ? -1 : a > b ? 1 : 0;
});

function createFurnitureCategories(props: FurnitureScreenProps): ReactNode[] {
    let furnitureCategoryBoxes = [];
    for (let i = 0; i < furnitureCatagories.length; i++) {
        let currentFurnitureList = allItems.filter(x => x.sourceSheet === furnitureCatagories[i]);
        furnitureCategoryBoxes.push(
            <View key={`furniturePersonalityOuterBox${i}`} style={i % 2 === 0 ? styles.furnitureOuterBoxEven : styles.furnitureOuterBoxOdd}>
                <TouchableOpacity key={`furniturePersonalityTouchable${i}`} style={styles.furnitureTouchable} onPress={() => { props.navigation.navigate("Furniture", { category: furnitureCatagories[i] }) }} >
                <Image style={{ width: 50, height: 50 }} source={{ uri: currentFurnitureList[Math.floor(Math.random() * currentFurnitureList.length)].variants[0].image as string }}></Image>
                    <Text key={`furniturePersonalityText${i}`} style={styles.furnitureText}>{furnitureCatagories[i]}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return furnitureCategoryBoxes;
}


class FurnitureCategoryScreen extends PureComponent<FurnitureScreenProps> {
    constructor(props: FurnitureScreenProps) {
        super(props);
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={{ padding: 20, alignItems: 'center' }}>
                    <View style={{ width: '90%' }}>
                        <TouchableOpacity style={{ borderColor: 'grey', borderWidth: 2, borderRadius: 5 }} onPress={() => this.props.navigation.navigate("Furniture")}>
                            <Text style={{ textAlign: 'center' }}>{"All Furniture"}</Text>
                        </TouchableOpacity>
                    </View>                    
                    <View style={{ width: '90%', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, padding: 20, borderColor: 'grey', borderWidth: 2, borderRadius: 5 }}>
                        {createFurnitureCategories(this.props)}
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

export default connect(mapStateToProps)(FurnitureCategoryScreen);