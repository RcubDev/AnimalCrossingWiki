import { FilterCritters } from "./CritterFilterAdvanced";
import { AdvancedFilterBugModel } from "../../models/Filter/AdvancedFilterBugModel";
import { BugModel } from "../../models/CollectionModels/BugModel";

export function FilterBugs(bugsFilter: AdvancedFilterBugModel, bugs: Array<BugModel>): Array<BugModel>{
    let filteredCritters = FilterCritters(bugsFilter, bugs).map(x => x.id);
    bugs = ApplyLocation(bugsFilter.location, bugs);
    bugs = bugs.filter(x => filteredCritters.includes(x.id)); 
    return bugs;
}

function ApplyLocation(location: number, allBugs: Array<BugModel>): Array<BugModel> {
    if (location !== -1) {
        allBugs = allBugs.filter(x => x.location === location);
    }
    return allBugs;
}