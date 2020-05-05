import { AdvancedSortFilterFishModel } from "../../models/FishScreen/AdvancedSortFilterFishModel";
import { NewFishModel } from "../../models/CollectionModels/NewFishModel";
import { MonthsAvaliable } from "../../models/fishModel";
import _ from "lodash";

export function FilterAdvancedFish(filterOptions: AdvancedSortFilterFishModel, allFish: Array<NewFishModel>): Array<NewFishModel> {
    allFish = ApplyShadowSize(filterOptions.shadowSize, allFish);
    allFish = ApplyLocation(filterOptions.location, allFish);
    allFish = ApplyMonths(filterOptions, allFish);
    allFish = ApplyRarity(filterOptions.rarity, allFish);
    allFish = ApplyCaught(filterOptions.caught, allFish);
    allFish = ApplyDonated(filterOptions.donated, allFish);
    allFish = ApplyNotCaught(filterOptions.notCaught, allFish);
    allFish = ApplyNotDonated(filterOptions.notDonated, allFish);

    return allFish;
}

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

function ApplyMonths(monthsAvail: MonthsAvaliable, allFish: Array<NewFishModel>): Array<NewFishModel> {
    let newFish: Array<NewFishModel> = [];
    if (!monthsAvail.jan && !monthsAvail.feb && !monthsAvail.mar && !monthsAvail.apr && !monthsAvail.may && !monthsAvail.jun &&
        !monthsAvail.jul && !monthsAvail.aug && !monthsAvail.sep && !monthsAvail.oct && !monthsAvail.nov && !monthsAvail.dec) {
            newFish = allFish;
    } else {
        if (monthsAvail.jan) {
            newFish = _.union(newFish, allFish.filter(x => x.monthsAvailable.jan));
        }
        if (monthsAvail.feb) {
            newFish = _.union(newFish, allFish.filter(x => x.monthsAvailable.feb));
        }
        if (monthsAvail.mar) {
            newFish = _.union(newFish, allFish.filter(x => x.monthsAvailable.mar));
        }
        if (monthsAvail.apr) {
            newFish = _.union(newFish, allFish.filter(x => x.monthsAvailable.apr));
        }
        if (monthsAvail.may) {
            newFish = _.union(newFish, allFish.filter(x => x.monthsAvailable.may));
        }
        if (monthsAvail.jun) {
            newFish = _.union(newFish, allFish.filter(x => x.monthsAvailable.jun));
        }
        if (monthsAvail.jul) {
            newFish = _.union(newFish, allFish.filter(x => x.monthsAvailable.jul));
        }
        if (monthsAvail.aug) {
            newFish = _.union(newFish, allFish.filter(x => x.monthsAvailable.aug));
        }
        if (monthsAvail.sep) {
            newFish = _.union(newFish, allFish.filter(x => x.monthsAvailable.sep));
        }
        if (monthsAvail.oct) {
            newFish = _.union(newFish, allFish.filter(x => x.monthsAvailable.oct));
        }
        if (monthsAvail.nov) {
            newFish = _.union(newFish, allFish.filter(x => x.monthsAvailable.nov));
        }
        if (monthsAvail.dec) {
            newFish = _.union(newFish, allFish.filter(x => x.monthsAvailable.dec));
        }
    }

    return newFish;
}

function ApplyRarity(rarity: number, allFish: Array<NewFishModel>): Array<NewFishModel> {
    if (rarity !== -1) {
        allFish = allFish.filter(x => x.rarity === rarity);
    }
    return allFish;
}

function ApplyCaught(caught: boolean, allFish: Array<NewFishModel>): Array<NewFishModel> {
    if (caught) {
        allFish = allFish.filter(x => x.caught);
    }
    return allFish;
}

function ApplyDonated(donated: boolean, allFish: Array<NewFishModel>): Array<NewFishModel> {
    if (donated) {
        allFish = allFish.filter(x => x.donated);
    }
    return allFish;
}

function ApplyNotCaught(notCaught: boolean, allFish: Array<NewFishModel>): Array<NewFishModel> {
    if (notCaught) {
        allFish = allFish.filter(x => !x.caught);
    }
    return allFish;
}

function ApplyNotDonated(notDonated: boolean, allFish: Array<NewFishModel>): Array<NewFishModel> {
    if (notDonated) {
        allFish = allFish.filter(x => !x.donated);
    }
    return allFish;
}