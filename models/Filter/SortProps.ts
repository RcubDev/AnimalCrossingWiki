import { AdvancedSortFishModel } from "../FishScreen/AdvancedSortFishModel";

export interface FilterProps {
    updateFunction: (filter: AdvancedSortFishModel) => void,
    currentFilterSettings: AdvancedSortFishModel
}
