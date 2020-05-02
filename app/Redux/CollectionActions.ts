import {UPDATE_FISH_CAUGHT, UPDATE_FISH_DONATED, FishActionTypes, FishCaughtPayload, FishDonatedPayload, UpdateFishFilter, UPDATE_FISH_FILTER} from './Types'
import { AdvancedSortFilterFishModel } from '../../models/FishScreen/AdvancedSortFilterFishModel'

export function updateFishCaught(payload: FishCaughtPayload): FishActionTypes {
    return {        
        type: UPDATE_FISH_CAUGHT,
        payload: payload
    }
}

export function updateFishDonated(payload: FishDonatedPayload): FishActionTypes {
    return {
        type: UPDATE_FISH_DONATED,
        payload: payload
    }
}

export function updateFishFilter(payload: AdvancedSortFilterFishModel): FishActionTypes {
    return {
        type: UPDATE_FISH_FILTER,
        payload: payload
    }
}