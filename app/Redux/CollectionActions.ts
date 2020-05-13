import { UPDATE_FISH_CAUGHT, UPDATE_FISH_DONATED, ActionTypes, CaughtPayload, DonatedPayload, UPDATE_FISH_FILTER, UPDATE_FISH_COLLECTION, UPDATE_IN_GAME_DATE, UPDATE_HEMISPHERE, InGameTimeOffSetPayload, UPDATE_FISH_SORT, UPDATE_BUG_CAUGHT, UPDATE_BUG_DONATED, UPDATE_BUG_FILTER, UPDATE_BUG_COLLECTION, UPDATE_BUG_SORT, UPDATE_FOSSIL_COLLECTION, UPDATE_FOSSIL_DONATED, UPDATE_ARTWORK_COLLECTION, UPDATE_ARTWORK_DONATED } from './Types'
import { AdvancedSortFilterFishModel } from '../../models/MainScreenModels/FishScreen/AdvancedSortFilterFishModel'
import { NewFishModel } from '../../models/CollectionModels/NewFishModel'
import { AdvancedSortFishModel } from '../../models/Sort/AdvancedSortFishModel'
import { BugModel } from '../../models/CollectionModels/BugModel'
import { AdvancedFilterBugModel } from '../../models/Filter/AdvancedFilterBugModel'
import { AdvancedSortBugModel } from '../../models/Sort/AdvancedSortBugModel'
import { FossilModel } from '../../models/CollectionModels/FossilModel'
import { ArtworkModel } from '../../models/CollectionModels/ArtworkModel'

export function updateFishCaught(payload: CaughtPayload): ActionTypes {
    return {
        type: UPDATE_FISH_CAUGHT,
        payload: payload
    }
}

export function updateFishDonated(payload: DonatedPayload): ActionTypes {
    return {
        type: UPDATE_FISH_DONATED,
        payload: payload
    }
}

export function updateFishFilter(payload: AdvancedSortFilterFishModel): ActionTypes {
    return {
        type: UPDATE_FISH_FILTER,
        payload: payload
    }
}

export function updateFishSort(payload: AdvancedSortFishModel): ActionTypes {
    return {
        type: UPDATE_FISH_SORT,
        payload: payload
    }
}

export function updateFishCollectionFromStorage(payload: Array<NewFishModel>): ActionTypes {
    return {
        type: UPDATE_FISH_COLLECTION,
        payload: payload
    }
}

export function updateFossilCollectionFromStorage(payload: Array<FossilModel>): ActionTypes {
    return {
        type: UPDATE_FOSSIL_COLLECTION,
        payload: payload
    }
}

export function updateArtworkCollectionFromStorage(payload: Array<ArtworkModel>): ActionTypes {
    return {
        type: UPDATE_ARTWORK_COLLECTION,
        payload: payload
    }
}

export function updateArtworkDonated(payload: DonatedPayload): ActionTypes {
    return {
        type: UPDATE_ARTWORK_DONATED,
        payload: payload
    }
}

export function updateFossilDonated(payload: DonatedPayload): ActionTypes {
    return {
        type: UPDATE_FOSSIL_DONATED,
        payload: payload
    }
}

export function updateBugCaught(payload: CaughtPayload): ActionTypes {
    return {
        type: UPDATE_BUG_CAUGHT,
        payload: payload
    }
}

export function updateBugDonated(payload: DonatedPayload): ActionTypes {
    return {
        type: UPDATE_BUG_DONATED,
        payload: payload
    }
}

export function updateBugFilter(payload: AdvancedFilterBugModel): ActionTypes {
    return {
        type: UPDATE_BUG_FILTER,
        payload: payload
    }
}

export function updateBugCollectionFromStorage(payload: Array<BugModel>): ActionTypes {
    return {
        type: UPDATE_BUG_COLLECTION,
        payload: payload
    }
}

export function updateBugSort(payload: AdvancedSortBugModel): ActionTypes {
    return {
        type: UPDATE_BUG_SORT,
        payload: payload
    }
}

export function updateInGameTime(payload: InGameTimeOffSetPayload): ActionTypes {
    return {
        type: UPDATE_IN_GAME_DATE,
        payload: payload
    }
}

export function updateHemisphere(payload: boolean): ActionTypes {
    return {
        type: UPDATE_HEMISPHERE,
        payload: payload
    }
}

export const CollectionActions = { updateFishCaught };