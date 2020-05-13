import { combineReducers } from "redux";
import { ReduxActions, UPDATE_CREATURE_CAUGHT, UPDATE_CREATURE_DONATED, UPDATE_ITEM_DONATED, UpdateCreatureCaughtAction, UpdateCreatureDonatedAction, UpdateItemDonatedAction, UpdateItemCataloggedAction, UPDATE_ITEM_CATALOGGED } from "./Types";
import { ApplicationStateV2 } from "../../models/ApplicationState/ApplicationStateV2";
import { Item } from "native-base";
import { CataloggedItemModel } from "../../models/CollectionModelsV2/CataloggedItemModel";
import { CreatureCaughtModel } from "../../models/CollectionModelsV2/CreatureStorageModel";

const INITIAL_STATE: ApplicationStateV2 = {
    furnitureItems: [],
    clothingItems: [],
    fish: [],
    bugs: [],
    artwork: [],
    fossils: [],
    reactions: [],
    villagers: [],
    kkSongs: [],
    recipies: [],
    achievements: []
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
        default:
            return state;
    }
};

//Fish and Bugs
function updateCreatureCaught(state: ApplicationStateV2, action: UpdateCreatureCaughtAction): ApplicationStateV2 {
    let existingState = state;
    switch (action.payload.type) {
        case "Fish":
            let existingFish = existingState.fish.find(x => x.internalId === x.id);
            if (existingFish) {
                existingFish.caught = action.payload.caught;
            }
            break;
        case "Bug":
            let existingBug = existingState.bugs.find(x => x.internalId === x.id);
            if (existingBug) {
                existingBug.caught = action.payload.caught;
            }
            break;
        default:
            console.warn('Did you use the correct redux function?');
            return state;
    }
    return Object.assign({}, state, existingState);}

function updateCreatureDonated(state: ApplicationStateV2, action: UpdateCreatureDonatedAction): ApplicationStateV2 {
    let existingState = state;
    switch (action.payload.type) {
        case "Fish":
            let existingFish = existingState.fish.find(x => x.internalId === x.id);
            if (existingFish) {
                if (action.payload.donated) {
                    existingFish.caught = true;
                }
                existingFish.donated = action.payload.donated;
            }
            break;
        case "Bug":
            let existingBug = existingState.bugs.find(x => x.internalId === x.id);
            if (existingBug) {
                if (action.payload.donated) {
                    existingBug.caught = true;
                }
                existingBug.donated = action.payload.donated;
            }
            break;
        default:
            console.warn('Did you use the correct redux function?');
            return state;
    }
    return Object.assign({}, state, existingState);
}

//Art and Fossils
function updateItemDonated(state: ApplicationStateV2, action: UpdateItemDonatedAction): ApplicationStateV2 {
    let existingState = state;
    switch (action.payload.type) {
        case "Fossil":
            let existingFossil = existingState.fossils.find(x => x.name === action.payload.name);
            if (existingFossil) {
                existingFossil.donated = action.payload.donated;
            }
            break;
        case "Artwork":
            let existingArtwork = existingState.artwork.find(x => x.name === action.payload.name);
            if (existingArtwork) {
                existingArtwork.donated = action.payload.donated;
            }
            break;
        default:
            console.warn('did you use the right redux function?');
            return state;
    }
    return Object.assign({}, state, existingState);
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