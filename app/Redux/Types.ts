import { NewFishModel } from "../../models/CollectionModels/NewFishModel";
import { BugModel } from "../../models/CollectionModels/BugModel";
import { AdvancedSortFilterFishModel } from "../../models/FishScreen/AdvancedSortFilterFishModel";
import { AdvancedSortFishModel } from "../../models/FishScreen/AdvancedSortFishModel";

export interface FishCaughtPayload {
    index:number,
    caught: boolean
}
//I realized these can be reused
export interface FishDonatedPayload {
    index:number,
    donated: boolean
}

export interface InGameTimeOffSetPayload {
    minutes: number
}

export const UPDATE_FISH_CAUGHT = 'UPDATE_FISH_CAUGHT';
export const UPDATE_FISH_DONATED = 'UPDATE_FISH_DONATED';
export const UPDATE_FISH_FILTER = "UPDATE_FISH_FILTER";
export const UPDATE_FISH_COLLECTION = "UPDATE_FISH_COLLECTION";
export const UPDATE_FISH_SORT = "UPDATE_FISH_SORT";
export const UPDATE_IN_GAME_DATE = "UPDATE_IN_GAME_DATE";
export const UPDATE_HEMISPHERE = "UPDATE_HEMISPHERE";

interface UpdateFishCaught {
    type: typeof UPDATE_FISH_CAUGHT,
    payload: FishCaughtPayload
}

interface UpdateFishDonated {
    type: typeof UPDATE_FISH_DONATED,
    payload: FishDonatedPayload
}

interface UpdateFishFilter {
    type: typeof UPDATE_FISH_FILTER,
    payload: AdvancedSortFilterFishModel
}

interface UpdateFishCollection {
    type: typeof UPDATE_FISH_COLLECTION,
    payload: Array<NewFishModel>
}

interface UpdateFishSort {
    type: typeof UPDATE_FISH_SORT,
    payload: AdvancedSortFishModel
}

interface UpdateInGameTime {
    type: typeof UPDATE_IN_GAME_DATE,
    payload: InGameTimeOffSetPayload
}

interface UpdateHemisphere {
    type: typeof UPDATE_HEMISPHERE,
    payload: boolean
}

export type {UpdateFishDonated, UpdateFishCaught, UpdateFishFilter, UpdateFishCollection, UpdateInGameTime, UpdateHemisphere, UpdateFishSort};

export type FishActionTypes = UpdateFishCaught | UpdateFishDonated | UpdateFishFilter | UpdateFishCollection | UpdateInGameTime | UpdateHemisphere | UpdateFishSort;
