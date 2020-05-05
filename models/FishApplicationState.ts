import { NewFishModel } from "./CollectionModels/NewFishModel";
import { AdvancedSortFilterFishModel } from "./FishScreen/AdvancedSortFilterFishModel";
import { AdvancedSortFishModel } from "./FishScreen/AdvancedSortFishModel";

export interface FishApplicationState {
    fishCollection: Array<NewFishModel>,
    fishAdvancedSortFilter: AdvancedSortFilterFishModel
    fishAdvancedSort: AdvancedSortFishModel
}