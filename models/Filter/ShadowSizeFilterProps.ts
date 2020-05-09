import { AdvancedSortFilterFishModel } from "../MainScreenModels/FishScreen/AdvancedSortFilterFishModel";

export interface ShadowSizeFilterProps{
    updateFunction: (filter: any) => void,
    currentFilterSettings: AdvancedSortFilterFishModel
}