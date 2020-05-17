import { SortModel } from "./AdvancedSortCritterModel";

export interface SortProps {
    setSortModel: (sortModel: SortModel) => void,
    currentSort: SortModel
}