import { FilterModel } from "../../Filter/FilterModel";

export interface ArtworkScreenState{
    isReady: boolean,
    showFilterModal: boolean,
    showSortModal: boolean,
    filter: FilterModel,
    filterText: string
}