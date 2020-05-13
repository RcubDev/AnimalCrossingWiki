import { NewFishModel } from "../../models/CollectionModels/NewFishModel";
import { BugModel } from "../../models/CollectionModels/BugModel";
import { AdvancedSortFilterFishModel } from "../../models/MainScreenModels/FishScreen/AdvancedSortFilterFishModel";
import { AdvancedSortFishModel } from "../../models/Sort/AdvancedSortFishModel";
import { AdvancedFilterBugModel } from "../../models/Filter/AdvancedFilterBugModel";
import { AdvancedSortBugModel } from "../../models/Sort/AdvancedSortBugModel";
import { FossilModel } from "../../models/CollectionModels/FossilModel";
import { ArtworkModel } from "../../models/CollectionModels/ArtworkModel";

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

//Fossil const
export const UPDATE_FOSSIL_COLLECTION = "UPDATE_FOSSIL_COLLECTION";
export const UPDATE_FOSSIL_DONATED = 'UPDATE_FOSSIL_DONATED';


//Artwork const
export const UPDATE_ARTWORK_COLLECTION = "UPDATE_ARTWORK_COLLECTION";
export const UPDATE_ARTWORK_DONATED = 'UPDATE_ARTWORK_DONATED';

//Ohter const
export const UPDATE_IN_GAME_DATE = "UPDATE_IN_GAME_DATE";
export const UPDATE_HEMISPHERE = "UPDATE_HEMISPHERE";

//Artwork Action Interface
export interface UpdateArtworkCollection {
    type: typeof UPDATE_ARTWORK_COLLECTION,
    payload: Array<ArtworkModel>
}

export interface UpdateArtworkDonated {
    type: typeof UPDATE_ARTWORK_DONATED,
    payload: DonatedPayload
}

//Fossil Action Interfaces
export interface UpdateFossilCollection {
    type: typeof UPDATE_FOSSIL_COLLECTION,
    payload: Array<FossilModel>
}

export interface UpdateFossilDonated {
    type: typeof UPDATE_FOSSIL_DONATED,
    payload: DonatedPayload
}

//Fish Action Interfaces
export interface UpdateFishCaught {
    type: typeof UPDATE_FISH_CAUGHT,
    payload: CaughtPayload
}

export interface UpdateFishDonated {
    type: typeof UPDATE_FISH_DONATED,
    payload: DonatedPayload
}

export interface UpdateFishFilter {
    type: typeof UPDATE_FISH_FILTER,
    payload: AdvancedSortFilterFishModel
}

export interface UpdateFishCollection {
    type: typeof UPDATE_FISH_COLLECTION,
    payload: Array<NewFishModel>
}

export interface UpdateFishSort {
    type: typeof UPDATE_FISH_SORT,
    payload: AdvancedSortFishModel
}

//Bug Action Interfaces
export interface UpdateBugDonated {
    type: typeof UPDATE_BUG_DONATED,
    payload: DonatedPayload
}

export interface UpdateBugCaught {
    type: typeof UPDATE_BUG_CAUGHT,
    payload: CaughtPayload
}

export interface UpdateBugFilter {
    type: typeof UPDATE_BUG_FILTER,
    payload: AdvancedFilterBugModel
}

export interface UpdateBugCollection {
    type: typeof UPDATE_BUG_COLLECTION,
    payload: Array<BugModel>
}

export interface UpdateBugSort {
    type: typeof UPDATE_BUG_SORT,
    payload: AdvancedSortBugModel
}

//Other Interfaces

export interface UpdateInGameTime {
    type: typeof UPDATE_IN_GAME_DATE,
    payload: InGameTimeOffSetPayload
}

export interface UpdateHemisphere {
    type: typeof UPDATE_HEMISPHERE,
    payload: boolean
}

export type ActionTypes =
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
    UpdateBugCollection |
    UpdateFossilCollection |
    UpdateFossilDonated |
    UpdateArtworkCollection |
    UpdateArtworkDonated;
