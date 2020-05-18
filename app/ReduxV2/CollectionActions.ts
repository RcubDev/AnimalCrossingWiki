import { UPDATE_ITEM_DONATED, UPDATE_CREATURE_DONATED, UPDATE_CREATURE_CAUGHT, CaughtPayload, ItemDonatedPayload, ReduxActions, CreatureDonatedPayload, UpdateItemCataloggedAction, CataloggedPayload, UPDATE_ITEM_CATALOGGED, UPDATE_FISH_COLLECTION, UPDATE_BUG_COLLECTION, UPDATE_FOSSIL_COLLECTION, UPDATE_ARTWORK_COLLECTION, UPDATE_IN_GAME_TIME, UPDATE_HEMISPHERE, UPDATE_KKSONG_COLLECTION, UPDATE_REACTION_COLLECTION, ObtainedPayload, UPDATE_MODEL_OBTAINED } from "./Types"
import { CreatureModel } from "../../models/CollectionModelsV2/creatures"
import { ItemModel } from "../../models/CollectionModelsV2/items"
import { ReactionModel } from "../../models/CollectionModelsV2/reactions"

export function updateFishCollectionFromStorage(payload: Array<CreatureModel>): ReduxActions {
    return {
        type: UPDATE_FISH_COLLECTION,
        payload
    }
}

export function updateCreatureCaught(payload: CaughtPayload): ReduxActions {
    return {
        type: UPDATE_CREATURE_CAUGHT,
        payload: payload
    }
}

export function updateCreatureDonated(payload: CreatureDonatedPayload): ReduxActions {
    return {
        type: UPDATE_CREATURE_DONATED,
        payload: payload
    }
}

export function updateItemDonated(payload: ItemDonatedPayload): ReduxActions {
    return {
        type: UPDATE_ITEM_DONATED,
        payload: payload
    }
}

export function updateItemCatalogged(payload: CataloggedPayload): ReduxActions {
    return {
        type: UPDATE_ITEM_CATALOGGED,
        payload
    }
}

export function updateModelObtained(payload: ObtainedPayload): ReduxActions {
    return {
        type: UPDATE_MODEL_OBTAINED,
        payload
    }
}

export function updateBugCollectionFromStorage(payload: Array<CreatureModel>): ReduxActions {
    return {
        type: UPDATE_BUG_COLLECTION,
        payload
    }
}

export function updateFossilCollectionFromStorage(payload: Array<ItemModel>): ReduxActions {
    return {
        type: UPDATE_FOSSIL_COLLECTION,
        payload
    }
}

export function updateArtworkCollectionFromStorage(payload: Array<ItemModel>): ReduxActions {
    return {
        type: UPDATE_ARTWORK_COLLECTION,
        payload
    }
}

export function updateKKSongCollectionFromStorage(payload: Array<ItemModel>): ReduxActions {
    return {
        type: UPDATE_KKSONG_COLLECTION,
        payload
    }
}

export function updateReactionCollectionFromStorage(payload: Array<ReactionModel>): ReduxActions {
    return {
        type: UPDATE_REACTION_COLLECTION,
        payload
    }
}

export function updateInGameTime(payload: number): ReduxActions {
    return {
        type: UPDATE_IN_GAME_TIME,
        payload
    }
}

export function updateHemisphere(payload: boolean): ReduxActions {
    return {
        type: UPDATE_HEMISPHERE,
        payload
    }
}