import { FilterModel } from "./FilterModel";

export interface FilterProps {
    setFilterModel: (filterModel: FilterModel) => void,
    currentFilter: FilterModel
}

