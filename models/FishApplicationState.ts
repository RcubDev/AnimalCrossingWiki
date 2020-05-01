import { NewFishModel } from "./CollectionModels/NewFishModel";

export interface FishApplicationState {
    fishCollection: Array<NewFishModel>,
    fishAdvancedFilterList: Array<NewFishModel>
}