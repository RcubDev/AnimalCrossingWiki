import { SortModel } from "./SortModel";

export interface SortProps {
    setSortModel: (sortModel: SortModel) => void,
    currentSort: SortModel
}