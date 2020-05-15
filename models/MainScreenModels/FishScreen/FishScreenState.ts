import { FilterModel } from "../../Filter/FilterModel";

export interface FishScreenState {
    isReady: boolean,
    filterText: string,
    showFilterModal: boolean,
    showSortModal: boolean,
    filter: FilterModel
}