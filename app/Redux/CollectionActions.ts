import { UPDATE_FISH_CAUGHT, UPDATE_FISH_DONATED, FishActionTypes, FishCaughtPayload, FishDonatedPayload, UPDATE_FISH_FILTER, UPDATE_FISH_COLLECTION, UPDATE_IN_GAME_DATE, UPDATE_HEMISPHERE, InGameTimeOffSetPayload, UPDATE_FISH_SORT } from './Types'
import { AdvancedSortFilterFishModel } from '../../models/FishScreen/AdvancedSortFilterFishModel'
import { NewFishModel } from '../../models/CollectionModels/NewFishModel'
import { AdvancedSortFishModel } from '../../models/FishScreen/AdvancedSortFishModel'

export function updateFishCaught(payload: FishCaughtPayload): FishActionTypes {
    return {
        type: UPDATE_FISH_CAUGHT,
        payload: payload
    };
}

export function updateFishDonated(payload: FishDonatedPayload): FishActionTypes {
    return {
        type: UPDATE_FISH_DONATED,
        payload: payload
    };
}

export function updateFishFilter(payload: AdvancedSortFilterFishModel): FishActionTypes {
    return {
        type: UPDATE_FISH_FILTER,
        payload: payload
    }
}

export function updateFishSort(payload: AdvancedSortFishModel): FishActionTypes {
    return {
        type: UPDATE_FISH_SORT,
        payload: payload
    }
}

export function updateFishCollectionFromStorage(payload: Array<NewFishModel>): FishActionTypes {
    return {
        type: UPDATE_FISH_COLLECTION,
        payload: payload
    }
}

export function updateInGameTime(payload: InGameTimeOffSetPayload): FishActionTypes {
    return {
        type: UPDATE_IN_GAME_DATE,
        payload: payload
    }
}

export function updateHemisphere(payload: boolean): FishActionTypes {
    return {
        type: UPDATE_HEMISPHERE,
        payload: payload
    }
}