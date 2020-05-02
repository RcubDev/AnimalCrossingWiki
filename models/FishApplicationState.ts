import { NewFishModel } from "./CollectionModels/NewFishModel";
import { AdvancedSortFilterFishModel } from "./FishScreen/AdvancedSortFilterFishModel";

export interface FishApplicationState {
    fishCollection: Array<NewFishModel>,
    fishAdvancedSortFilter: AdvancedSortFilterFishModel
}