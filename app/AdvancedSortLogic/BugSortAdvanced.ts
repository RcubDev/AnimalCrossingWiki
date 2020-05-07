import { AdvancedSortBugModel } from "../../models/Sort/AdvancedSortBugModel";
import { BugModel } from "../../models/CollectionModels/BugModel";
import { SortCritters } from "./SortAdvanced";

export function SortBugs(bugArray: Array<BugModel>, sort: AdvancedSortBugModel): Array<BugModel>{
    let sortedCritters = SortCritters(bugArray, sort).map(x => x.id);
    return bugArray.sort(function (a, b) {
        return sortedCritters.indexOf(a.id) - sortedCritters.indexOf(b.id);
    });
}