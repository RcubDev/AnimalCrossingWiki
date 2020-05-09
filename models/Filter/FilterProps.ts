import { AdvancedSortFilterFishModel } from "../MainScreenModels/FishScreen/AdvancedSortFilterFishModel";
import { AdvancedFilterBugModel } from "./AdvancedFilterBugModel";
import { AdvancedFilterCritterModel } from "./AdvancedFilterCritterModel";

export interface FilterProps {
    //TODO fix this being type any
    updateFunction: (filter: any) => void,
    currentFilterSettings: AdvancedSortFilterFishModel | AdvancedFilterBugModel
}
