import { AdvancedSortFishModel } from "../Sort/AdvancedSortFishModel";

export interface FilterProps {
    updateFunction: (filter: AdvancedSortFishModel) => void,
    currentFilterSettings: AdvancedSortFishModel
}
