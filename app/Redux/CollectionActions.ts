import {UPDATE_FISH_CAUGHT, UPDATE_FISH_DONATED, FishActionTypes, FishCaughtPayload, FishDonatedPayload} from './Types'

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