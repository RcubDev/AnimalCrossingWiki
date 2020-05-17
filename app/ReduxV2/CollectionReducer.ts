import { combineReducers } from "redux";
import { ReduxActions, UPDATE_CREATURE_CAUGHT, UPDATE_CREATURE_DONATED, UPDATE_ITEM_DONATED, UpdateCreatureCaughtAction, UpdateCreatureDonatedAction, UpdateItemDonatedAction, UpdateItemCataloggedAction, UPDATE_ITEM_CATALOGGED, UpdateFishCollectionAction, UPDATE_FISH_COLLECTION, UpdateBugCollectionAction, UPDATE_BUG_COLLECTION, UpdateFossilCollectionAction, UPDATE_FOSSIL_COLLECTION, UpdateArtworkCollectionAction, UPDATE_ARTWORK_COLLECTION } from "./Types";
import { ApplicationStateV2 } from "../../models/ApplicationState/ApplicationStateV2";
import { Item } from "native-base";
import { CataloggedItemModel } from "../../models/CollectionModelsV2/CataloggedItemModel";
import { CreatureCaughtModel } from "../../models/CollectionModelsV2/CreatureStorageModel";
import { AsyncStorage } from "react-native";

const INITIAL_STATE: ApplicationStateV2 = {
    furnitureItems: [],
    clothingItems: [],
    fish: {fishCollection: []},
    bugs: {bugCollection: []},
    artwork: {artworkCollection: []},
    fossils: {fossilCollection: []},
    reactions: [],
    villagers: [],
    kkSongs: [],
    recipies: [],
    achievements: [],
    userSettings: {isNorthernHemisphere: true, inGameTime: {minutes: 0}}
};

const collectionReducer = (state = INITIAL_STATE, action: ReduxActions): ApplicationStateV2 => {
    switch (action.type) {
        case UPDATE_CREATURE_CAUGHT:
            return updateCreatureCaught(state, action);
        case UPDATE_CREATURE_DONATED:
            return updateCreatureDonated(state, action);
        case UPDATE_ITEM_DONATED:
            return updateItemDonated(state, action);
        case UPDATE_ITEM_CATALOGGED:
            return updateItemCatalogged(state, action);
        case UPDATE_FISH_COLLECTION:
            return updateFishCollectionFromStorage(state, action);
        case UPDATE_BUG_COLLECTION:
            return updateBugCollectionFromStorage(state, action);
        case UPDATE_FOSSIL_COLLECTION:
            return updateFossilCollectionFromStorage(state, action);
        case UPDATE_ARTWORK_COLLECTION:
            return updateArtworkCollectionFromStorage(state, action);        
        default:
            return state;
    }
};

function updateFishCollectionFromStorage(state: ApplicationStateV2, action: UpdateFishCollectionAction): ApplicationStateV2 {
    return { ...state, fish: { ...state.fish, fishCollection: action.payload } };
  }

function updateBugCollectionFromStorage(state: ApplicationStateV2, action: UpdateBugCollectionAction): ApplicationStateV2 {
    return { ...state, bugs: { ...state.bugs, bugCollection: action.payload } };
}

function updateFossilCollectionFromStorage(state: ApplicationStateV2, action: UpdateFossilCollectionAction): ApplicationStateV2 {
    return { ...state, fossils: { ...state.bugs, fossilCollection: action.payload } };
}

function updateArtworkCollectionFromStorage(state: ApplicationStateV2, action: UpdateArtworkCollectionAction): ApplicationStateV2 {
    return { ...state, artwork: { ...state.artwork, artworkCollection: action.payload } };
}

//Fish and Bugs
function updateCreatureCaught(state: ApplicationStateV2, action: UpdateCreatureCaughtAction): ApplicationStateV2 {
    let existingState = state;
    switch (action.payload.type) {
        case "Fish":
            const updatedFishCollection = state.fish.fishCollection.map(fish => fish.internalId === action.payload.id ? { ...fish, caught: action.payload.caught } : fish);
            AsyncStorage.setItem('fishStore', JSON.stringify(updatedFishCollection));
            return {
              ...state, fish: { ...state.fish, fishCollection: updatedFishCollection }
            };
        case "Bug":
            const updatedBugCollection = state.bugs.bugCollection.map(bug => bug.internalId === action.payload.id ? { ...bug, caught: action.payload.caught } : bug);
            AsyncStorage.setItem('bugStore', JSON.stringify(updatedBugCollection));
            return {
              ...state, bugs: { ...state.bugs, bugCollection: updatedBugCollection }
            };
        default:
            console.warn('Did you use the correct redux function?');
            return state;
    }
}

function updateCreatureDonated(state: ApplicationStateV2, action: UpdateCreatureDonatedAction): ApplicationStateV2 {
    switch (action.payload.type) {
        case "Fish":
            const updatedFishCollection = state.fish.fishCollection.map(fish => fish.internalId === action.payload.id ? { ...fish, caught: action.payload.donated ? true : fish.caught, donated: action.payload.donated } : fish);
            AsyncStorage.setItem('fishStore', JSON.stringify(updatedFishCollection));
            return {
              ...state, fish: { ...state.fish, fishCollection: updatedFishCollection }
            };
        case "Bug":
            const updatedBugCollection = state.bugs.bugCollection.map(bug => bug.internalId === action.payload.id ? { ...bug, caught: action.payload.donated ? true : bug.caught, donated: action.payload.donated } : bug);
            AsyncStorage.setItem('bugStore', JSON.stringify(updatedBugCollection));
            return {
              ...state, bugs: { ...state.bugs, bugCollection: updatedBugCollection }
            };
        default:
            console.warn('Did you use the correct redux function?');
            return state;
    }
}

//Art and Fossils
function updateItemDonated(state: ApplicationStateV2, action: UpdateItemDonatedAction): ApplicationStateV2 {
    switch (action.payload.type) {
        case "Fossil":
            const updatedFossilCollection = state.fossils.fossilCollection.map(fossil => fossil.name === action.payload.name ? { ...fossil, donated: action.payload.donated } : fossil);
            AsyncStorage.setItem('fossilStore', JSON.stringify(updatedFossilCollection));
            return {
              ...state, fossils: { ...state.fossils, fossilCollection: updatedFossilCollection }
            };
        case "Artwork":
            const updatedArtworkCollection = state.artwork.artworkCollection.map(artwork => artwork.name === action.payload.name ? { ...artwork, donated: action.payload.donated } : artwork);
            AsyncStorage.setItem('artworkStore', JSON.stringify(updatedArtworkCollection));
            return {
              ...state, artwork: { ...state.artwork, artworkCollection: updatedArtworkCollection }
            };
        default:
            console.warn('did you use the right redux function?');
            return state;
    }
}

function updateItemCatalogged(state: ApplicationStateV2, action: UpdateItemCataloggedAction): ApplicationStateV2 {
    let existingState = state;
    switch (action.payload.category) {
        case "Furniture":
            let existingFurnitureItem = existingState.furnitureItems.find(x => x.name === action.payload.name);
            if (existingFurnitureItem) {
                existingFurnitureItem.catalogged = action.payload.catalogged;
            }
            break;
        case "Clothing":
            let existingClothingItem = existingState.clothingItems.find(x => x.name === action.payload.name);
            if (existingClothingItem) {
                existingClothingItem.catalogged = action.payload.catalogged;
            }
            break;
        case "KKSongs":
            let existingKKSong = existingState.kkSongs.find(x => x.name === action.payload.name);
            if(existingKKSong){
                existingKKSong.catalogged = action.payload.catalogged;
            }
        default:
            console.warn('Are you using the wrong redux type?');
            return state;
    }
    return Object.assign({}, state, existingState);
}


export default combineReducers({
    appState: collectionReducer,
});