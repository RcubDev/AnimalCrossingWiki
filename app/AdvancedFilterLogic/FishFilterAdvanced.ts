import { NewFishModel } from "../../models/CollectionModels/NewFishModel";
import { AdvancedSortFishModel } from "../../models/Sort/AdvancedSortFishModel";
import { AdvancedSortFilterFishModel } from "../../models/MainScreenModels/FishScreen/AdvancedSortFilterFishModel";
import { FilterCritters } from "./CritterFilterAdvanced";

function ApplyShadowSize(shadowSize: number, allFish: Array<NewFishModel>): Array<NewFishModel> {
    if (shadowSize !== -1) {
        allFish = allFish.filter(x => x.shadowSize === shadowSize);
    }
    return allFish;
}

function ApplyLocation(location: number, allFish: Array<NewFishModel>): Array<NewFishModel> {
    if (location !== -1) {
        allFish = allFish.filter(x => x.location === location);
    }
    return allFish;
}

export function FilterFish(filterOptions: AdvancedSortFilterFishModel, allCritters: Array<NewFishModel>, timeOffSet: number = 0): Array<NewFishModel> {
    let filteredCritters = FilterCritters(filterOptions, allCritters).map(x => x.id);
    allCritters = ApplyShadowSize(filterOptions.shadowSize, allCritters);
    allCritters = ApplyLocation(filterOptions.location, allCritters);
    return allCritters.filter(x => filteredCritters.includes(x.id));
}
