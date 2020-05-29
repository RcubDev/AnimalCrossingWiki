import { combineReducers } from 'redux';
import { ReduxActions, UPDATE_CREATURE_CAUGHT, UPDATE_CREATURE_DONATED, UPDATE_ITEM_DONATED, UpdateCreatureCaughtAction, UpdateCreatureDonatedAction, UpdateItemDonatedAction, UpdateItemCataloggedAction, UPDATE_ITEM_CATALOGGED, UpdateFishCollectionAction, UPDATE_FISH_COLLECTION, UpdateBugCollectionAction, UPDATE_BUG_COLLECTION, UpdateFossilCollectionAction, UPDATE_FOSSIL_COLLECTION, UpdateArtworkCollectionAction, UPDATE_ARTWORK_COLLECTION, UPDATE_IN_GAME_TIME, UPDATE_HEMISPHERE, UpdateInGameTimeAction, UpdateHemisphereAction, UPDATE_KKSONG_COLLECTION, UPDATE_REACTION_COLLECTION, UpdateKKSongCollectionAction, UpdateReactionCollectionAction, UpdateModelObtainedAction, UPDATE_MODEL_OBTAINED, UPDATE_VILLAGER_COLLECTION, UPDATE_FURNITURE_COLLECTION, UPDATE_CLOTHING_COLLECTION, UpdateVillagerCollectionAction, UpdateClothingCollectionAction, UpdateFurnitureCollectionAction, UPDATE_VILLAGER_FAVORITED, UPDATE_VILLAGER_IN_VILLAGE, UpdateVillagerFavoritedAction, UpdateVillagerInVillageAction } from './Types';
import { ApplicationStateV2 } from '../../models/ApplicationState/ApplicationStateV2';
import { AsyncStorage } from 'react-native';
import { ItemSourceSheet } from '../../models/CollectionModelsV2/items';

const INITIAL_STATE: ApplicationStateV2 = {
    furnitureItems: { furnitureCollection: [] },
    clothingItems: { clothingCollection: [] },
    fish: { fishCollection: [] },
    bugs: { bugCollection: [] },
    artwork: { artworkCollection: [] },
    fossils: { fossilCollection: [] },
    reactions: { reactionCollection: [] },
    villagers: { villagerCollection: [] },
    kkSongs: { kkSongCollection: [] },
    recipies: { recipieCollection: [] },
    achievements: { achievementCollection: [] },
    userSettings: { isNorthernHemisphere: true, inGameTimeOffsetInMinutes: 0 }
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
        case UPDATE_MODEL_OBTAINED:
            return updateModelObtained(state, action);
        case UPDATE_VILLAGER_FAVORITED:
            return updateVillagerFavorited(state, action);
        case UPDATE_VILLAGER_IN_VILLAGE:
            return updateVillagerInVillage(state, action);
        case UPDATE_FISH_COLLECTION:
            return updateFishCollectionFromStorage(state, action);
        case UPDATE_BUG_COLLECTION:
            return updateBugCollectionFromStorage(state, action);
        case UPDATE_FOSSIL_COLLECTION:
            return updateFossilCollectionFromStorage(state, action);
        case UPDATE_ARTWORK_COLLECTION:
            return updateArtworkCollectionFromStorage(state, action);
        case UPDATE_KKSONG_COLLECTION:
            return updateKKSongCollectionFromStorage(state, action);
        case UPDATE_REACTION_COLLECTION:
            return updateReactionCollectionFromStorage(state, action);
        case UPDATE_VILLAGER_COLLECTION:
            return updateVillagerCollectionFromStorage(state, action);
        case UPDATE_FURNITURE_COLLECTION:
            return updateFurnitureCollectionFromStorage(state, action);
        case UPDATE_CLOTHING_COLLECTION:
            return updateClothingCollectionFromStorage(state, action);
        case UPDATE_IN_GAME_TIME:
            return updateInGameTime(state, action);
        case UPDATE_HEMISPHERE:
            return updateHemisphere(state, action);
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

function updateKKSongCollectionFromStorage(state: ApplicationStateV2, action: UpdateKKSongCollectionAction): ApplicationStateV2 {
    return { ...state, kkSongs: { ...state.kkSongs, kkSongCollection: action.payload } };
}

function updateReactionCollectionFromStorage(state: ApplicationStateV2, action: UpdateReactionCollectionAction): ApplicationStateV2 {
    return { ...state, reactions: { ...state.reactions, reactionCollection: action.payload } };
}

function updateVillagerCollectionFromStorage(state: ApplicationStateV2, action: UpdateVillagerCollectionAction): ApplicationStateV2 {
    return { ...state, villagers: { ...state.villagers, villagerCollection: action.payload } };
}

function updateClothingCollectionFromStorage(state: ApplicationStateV2, action: UpdateClothingCollectionAction): ApplicationStateV2 {
    return { ...state, clothingItems: { ...state.reactions, clothingCollection: action.payload } };
}

function updateFurnitureCollectionFromStorage(state: ApplicationStateV2, action: UpdateFurnitureCollectionAction): ApplicationStateV2 {
    return { ...state, furnitureItems: { ...state.furnitureItems, furnitureCollection: action.payload } };
}

//Fish and Bugs
function updateCreatureCaught(state: ApplicationStateV2, action: UpdateCreatureCaughtAction): ApplicationStateV2 {
    switch (action.payload.type) {
        case 'Fish':
            const updatedFishCollection = state.fish.fishCollection.map(fish => fish.internalId === action.payload.id ? { ...fish, caught: action.payload.caught } : fish);
            AsyncStorage.setItem('fishStore', JSON.stringify(updatedFishCollection));
            return {
                ...state, fish: { ...state.fish, fishCollection: updatedFishCollection }
            };
        case 'Bug':
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
        case 'Fish':
            const updatedFishCollection = state.fish.fishCollection.map(fish => fish.internalId === action.payload.id ? { ...fish, caught: action.payload.donated ? true : fish.caught, donated: action.payload.donated } : fish);
            AsyncStorage.setItem('fishStore', JSON.stringify(updatedFishCollection));
            return {
                ...state, fish: { ...state.fish, fishCollection: updatedFishCollection }
            };
        case 'Bug':
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
        case 'Fossil':
            const updatedFossilCollection = state.fossils.fossilCollection.map(fossil => fossil.name === action.payload.name ? { ...fossil, donated: action.payload.donated } : fossil);
            AsyncStorage.setItem('fossilStore', JSON.stringify(updatedFossilCollection));
            return {
                ...state, fossils: { ...state.fossils, fossilCollection: updatedFossilCollection }
            };
        case 'Artwork':
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
    switch (action.payload.subcategory) {
        case ItemSourceSheet.Fencing:
        case ItemSourceSheet.Floors:
        case ItemSourceSheet.Housewares:
        case ItemSourceSheet.Miscellaneous:
        case ItemSourceSheet.Photos:
        case ItemSourceSheet.Posters:
        case ItemSourceSheet.Rugs:
        case ItemSourceSheet.Tools:
        case ItemSourceSheet.WallMounted:
        case ItemSourceSheet.Wallpapers:
            const updatedFurnitureCollection = state.furnitureItems.furnitureCollection.map(furniture => furniture.name === action.payload.name ? { ...furniture, catalogged: action.payload.catalogged } : furniture);
            AsyncStorage.setItem('furnitureStore', JSON.stringify(updatedFurnitureCollection));
            return {
                ...state, furnitureItems: { ...state.furnitureItems, furnitureCollection: updatedFurnitureCollection }
            }
        case ItemSourceSheet.Accessories:
        case ItemSourceSheet.Bags:
        case ItemSourceSheet.Bottoms:
        case ItemSourceSheet.DressUp:
        case ItemSourceSheet.Headwear:
        case ItemSourceSheet.Shoes:
        case ItemSourceSheet.Socks:
        case ItemSourceSheet.Tops:
        case ItemSourceSheet.Umbrellas:
            const updatedClothingCollection = state.clothingItems.clothingCollection.map(clothing => clothing.name === action.payload.name ? { ...clothing, catalogged: action.payload.catalogged } : clothing);
            AsyncStorage.setItem('clothingStore', JSON.stringify(updatedClothingCollection));
            return {
                ...state, clothingItems: { ...state.clothingItems, clothingCollection: updatedClothingCollection }
            }
        case ItemSourceSheet.Music:
            const updatedKKCollection = state.kkSongs.kkSongCollection.map(kkSong => kkSong.name === action.payload.name ? { ...kkSong, catalogged: action.payload.catalogged } : kkSong);
            AsyncStorage.setItem('kkSongStore', JSON.stringify(updatedKKCollection));
            return {
                ...state, kkSongs: { ...state.kkSongs, kkSongCollection: updatedKKCollection }
            }
        default:
            console.warn('Are you using the wrong redux type?');
            return state;
    }
}

function updateModelObtained(state: ApplicationStateV2, action: UpdateModelObtainedAction): ApplicationStateV2 {
    const updatedReactionCollection = state.reactions.reactionCollection.map(reaction => reaction.name === action.payload.name ? { ...reaction, obtained: action.payload.obtained } : reaction);
    AsyncStorage.setItem('reactionStore', JSON.stringify(updatedReactionCollection));
    return {
        ...state, reactions: { ...state.reactions, reactionCollection: updatedReactionCollection }
    }
}

function updateVillagerFavorited(state: ApplicationStateV2, action: UpdateVillagerFavoritedAction): ApplicationStateV2 {
    const updatedVillagerCollection = state.villagers.villagerCollection.map(villager => villager.name === action.payload.name ? { ...villager, favorited: action.payload.favorite } : villager);
    AsyncStorage.setItem('villagerStore', JSON.stringify(updatedVillagerCollection));
    return {
        ...state, villagers: { ...state.villagers, villagerCollection: updatedVillagerCollection }
    }
}

function updateVillagerInVillage(state: ApplicationStateV2, action: UpdateVillagerInVillageAction): ApplicationStateV2 {
    const updatedVillagerCollection = state.villagers.villagerCollection.map(villager => villager.name === action.payload.name ? { ...villager, inVillage: action.payload.inVillage } : villager);
    AsyncStorage.setItem('villagerStore', JSON.stringify(updatedVillagerCollection));
    return {
        ...state, villagers: { ...state.villagers, villagerCollection: updatedVillagerCollection }
    }
}

function updateInGameTime(state: ApplicationStateV2, action: UpdateInGameTimeAction): ApplicationStateV2 {
    AsyncStorage.setItem('InGameTimeOffSet', JSON.stringify(action.payload));
    return { ...state, userSettings: { ...state.userSettings, inGameTimeOffsetInMinutes: action.payload } }
}

function updateHemisphere(state: ApplicationStateV2, action: UpdateHemisphereAction): ApplicationStateV2 {
    AsyncStorage.setItem('InGameTimeOffSet', JSON.stringify(action.payload));
    return { ...state, userSettings: { ...state.userSettings, isNorthernHemisphere: action.payload } }
}

export default combineReducers({
    appState: collectionReducer,
});