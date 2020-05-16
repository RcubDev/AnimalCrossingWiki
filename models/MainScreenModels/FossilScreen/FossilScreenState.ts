import { FilterModel } from "../../Filter/FilterModel";

export interface FossilScreenState{
    isReady: boolean,
    filterText: string,
    showFilterModal: boolean,
    showSortModal: boolean,
    filter: FilterModel,
}