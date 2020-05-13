import { NewFishModel } from "../../models/CollectionModels/NewFishModel";
import { BugModel } from "../../models/CollectionModels/BugModel";
import { AdvancedSortFilterFishModel } from "../../models/MainScreenModels/FishScreen/AdvancedSortFilterFishModel";
import { AdvancedSortFishModel } from "../../models/Sort/AdvancedSortFishModel";
import { AdvancedFilterBugModel } from "../../models/Filter/AdvancedFilterBugModel";
import { AdvancedSortBugModel } from "../../models/Sort/AdvancedSortBugModel";
import { FossilModel } from "../../models/CollectionModels/FossilModel";
import { ArtworkModel } from "../../models/CollectionModels/ArtworkModel";
import { ItemDonatedPayload, CaughtPayload } from "../ReduxV2/Types";

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
interface UpdateArtworkCollection {
    type: typeof UPDATE_ARTWORK_COLLECTION,
    payload: Array<ArtworkModel>
}

interface UpdateArtworkDonated {
    type: typeof UPDATE_ARTWORK_DONATED,
    payload: ItemDonatedPayload
}

//Fossil Action Interfaces
interface UpdateFossilCollection {
    type: typeof UPDATE_FOSSIL_COLLECTION,
    payload: Array<FossilModel>
}

interface UpdateFossilDonated {
    type: typeof UPDATE_FOSSIL_DONATED,
    payload: ItemDonatedPayload
}

//Fish Action Interfaces
interface UpdateFishCaught {
    type: typeof UPDATE_FISH_CAUGHT,
    payload: CaughtPayload
}

interface UpdateFishDonated {
    type: typeof UPDATE_FISH_DONATED,
    payload: ItemDonatedPayload
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
    payload: ItemDonatedPayload
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
    UpdateFossilCollection,
    UpdateFossilDonated,
    UpdateArtworkCollection,
    UpdateArtworkDonated
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
    UpdateBugCollection |
    UpdateFossilCollection |
    UpdateFossilDonated |
    UpdateArtworkCollection |
    UpdateArtworkDonated;
