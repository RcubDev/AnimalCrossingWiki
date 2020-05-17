import { FilterModel } from "../../Filter/FilterModel";
import { SortModel } from "../../Sort/AdvancedSortCritterModel";

export interface ArtworkScreenState{
    isReady: boolean,
    showFilterModal: boolean,
    showSortModal: boolean,
    filter: FilterModel,
    filterText: string,
    sort: SortModel
}