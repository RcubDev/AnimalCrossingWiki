import { AdvancedSortFilterFishModel } from "../FishScreen/AdvancedSortFilterFishModel";

export interface ShadowSizeFilterProps{
    updateFunction: (filter: any) => void,
    currentFilterSettings: AdvancedSortFilterFishModel
}