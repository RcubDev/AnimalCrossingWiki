import { NewFishModel } from "../../models/CollectionModels/NewFishModel";
import { BugModel } from "../../models/CollectionModels/BugModel";
import { AdvancedSortFilterFishModel } from "../../models/FishScreen/AdvancedSortFilterFishModel";

export interface FishCaughtPayload {
    index:number,
    caught: boolean
}
//I realized these can be reused
export interface FishDonatedPayload {
    index:number,
    donated: boolean
}

export const UPDATE_FISH_CAUGHT = 'UPDATE_FISH_CAUGHT';
export const UPDATE_FISH_DONATED = 'UPDATE_FISH_DONATED';
export const UPDATE_FISH_FILTER = "UPDATE_FISH_FILTER";

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

export type {UpdateFishDonated, UpdateFishCaught, UpdateFishFilter};

export type FishActionTypes = UpdateFishCaught | UpdateFishDonated | UpdateFishFilter;
