import { BugModel } from "../CollectionModels/BugModel";
import { AdvancedFilterBugModel } from "../Filter/AdvancedFilterBugModel";
import { AdvancedSortBugModel } from "../Sort/AdvancedSortBugModel";

export interface BugApplicationState {
    bugCollection: Array<BugModel>,
    bugAdvancedFilter: AdvancedFilterBugModel
    bugAdvancedSort: AdvancedSortBugModel
}

