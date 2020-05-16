import { AdvancedSortFilterFishModel } from "../MainScreenModels/FishScreen/AdvancedSortFilterFishModel";
import { AdvancedFilterBugModel } from "./AdvancedFilterBugModel";
import { FilterModel } from "./FilterModel";

export interface FilterProps {
    //TODO fix this being type any
    setFilterModel: (filterModel: FilterModel) => void,
    currentFilter: FilterModel
}
