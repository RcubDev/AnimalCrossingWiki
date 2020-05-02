import { AdvancedSortFilterFishModel } from "../FishScreen/AdvancedSortFilterFishModel";

export interface FilterProps {
    updateFunction: (filter: AdvancedSortFilterFishModel) => void,
    currentFilterSettings: AdvancedSortFilterFishModel
}
