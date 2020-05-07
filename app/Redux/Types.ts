import { NewFishModel } from "../../models/CollectionModels/NewFishModel";
import { BugModel } from "../../models/CollectionModels/BugModel";
import { AdvancedSortFilterFishModel } from "../../models/FishScreen/AdvancedSortFilterFishModel";
import { AdvancedSortFishModel } from "../../models/Sort/AdvancedSortFishModel";
import { AdvancedFilterBugModel } from "../../models/Filter/AdvancedFilterBugModel";
import { AdvancedSortBugModel } from "../../models/Sort/AdvancedSortBugModel";

export interface CaughtPayload {
    index: number,
    caught: boolean
}
//I realized these can be reused
export interface DonatedPayload {
    index: number,
    donated: boolean
}

export interface InGameTimeOffSetPayload {
    minutes: number
}

//Fish const
export const UPDATE_FISH_CAUGHT = 'UPDATE_FISH_CAUGHT';
export const UPDATE_FISH_DONATED = 'UPDATE_FISH_DONATED';
export const UPDATE_FISH_FILTER = "UPDATE_FISH_FILTER";
export const UPDATE_FISH_COLLECTION = "UPDATE_FISH_COLLECTION";
export const UPDATE_FISH_SORT = "UPDATE_FISH_SORT";

//Bug const
export const UPDATE_BUG_CAUGHT = 'UPDATE_BUG_CAUGHT';
export const UPDATE_BUG_DONATED = 'UPDATE_BUG_DONATED';
export const UPDATE_BUG_FILTER = "UPDATE_BUG_FILTER";
export const UPDATE_BUG_COLLECTION = "UPDATE_BUG_COLLECTION";
export const UPDATE_BUG_SORT = "UPDATE_BUG_SORT";

//Ohter const
export const UPDATE_IN_GAME_DATE = "UPDATE_IN_GAME_DATE";
export const UPDATE_HEMISPHERE = "UPDATE_HEMISPHERE";

//Fish Action Interfaces
interface UpdateFishCaught {
    type: typeof UPDATE_FISH_CAUGHT,
    payload: CaughtPayload
}

interface UpdateFishDonated {
    type: typeof UPDATE_FISH_DONATED,
    payload: DonatedPayload
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

//Bug Action Interfaces
interface UpdateBugDonated {
    type: typeof UPDATE_BUG_DONATED,
    payload: DonatedPayload
}

interface UpdateBugCaught {
    type: typeof UPDATE_BUG_CAUGHT,
    payload: CaughtPayload
}

interface UpdateBugFilter {
    type: typeof UPDATE_BUG_FILTER,
    payload: AdvancedFilterBugModel
}

interface UpdateBugCollection {
    type: typeof UPDATE_BUG_COLLECTION,
    payload: Array<BugModel>
}

interface UpdateBugSort {
    type: typeof UPDATE_BUG_SORT,
    payload: AdvancedSortBugModel
}

//Other Interfaces

interface UpdateInGameTime {
    type: typeof UPDATE_IN_GAME_DATE,
    payload: InGameTimeOffSetPayload
}

interface UpdateHemisphere {
    type: typeof UPDATE_HEMISPHERE,
    payload: boolean
}

export type {
    UpdateFishDonated,
    UpdateFishCaught,
    UpdateFishFilter,
    UpdateFishCollection,
    UpdateFishSort,
    UpdateInGameTime,
    UpdateHemisphere,
    UpdateBugDonated,
    UpdateBugCaught,
    UpdateBugFilter,
    UpdateBugCollection,
    UpdateBugSort,
};

export type FishActionTypes =
    UpdateFishCaught |
    UpdateFishDonated |
    UpdateFishFilter |
    UpdateFishCollection |
    UpdateFishSort |
    UpdateInGameTime |
    UpdateHemisphere |
    UpdateBugSort |
    UpdateBugCaught |
    UpdateBugDonated |
    UpdateBugFilter |
    UpdateBugCollection ;
