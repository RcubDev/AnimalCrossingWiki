import { FilterModel } from "../../Filter/FilterModel";
import { SortModel } from "../../Sort/SortModel";

export interface ArtworkScreenState{
    isReady: boolean,
    showFilterModal: boolean,
    showSortModal: boolean,
    filter: FilterModel,
    filterText: string,
    sort: SortModel
}