import { AdvancedSortFilterFishModel } from "../../models/FishScreen/AdvancedSortFilterFishModel";
import { NewFishModel } from "../../models/CollectionModels/NewFishModel";
import { MonthsAvaliable } from "../../models/fishModel";
import _ from "lodash";
import { List } from "native-base";
import moment from "moment";

export function FilterAdvancedFish(filterOptions: AdvancedSortFilterFishModel, allFish: Array<NewFishModel>, timeOffSet: number = 0): Array<NewFishModel> {
    allFish = ApplyShadowSize(filterOptions.shadowSize, allFish);
    allFish = ApplyLocation(filterOptions.location, allFish);
    allFish = ApplyMonths(filterOptions, allFish);
    allFish = ApplyRarity(filterOptions.rarity, allFish);
    allFish = ApplyCaught(filterOptions.caught, allFish);
    allFish = ApplyDonated(filterOptions.donated, allFish);
    allFish = ApplyNotCaught(filterOptions.notCaught, allFish);
    allFish = ApplyNotDonated(filterOptions.notDonated, allFish);
    allFish = ApplyCatchableNow(filterOptions.catchableNow, allFish, timeOffSet);
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

function ApplyCatchableNow(catchableNow: boolean, allFish: Array<NewFishModel>, timeOffSet: number): Array<NewFishModel> {
    if(catchableNow){
        let date = moment(new Date()).add(timeOffSet, 'minutes').toDate();
        let thisMonth = date.getMonth();
        let currentMonth: MonthsAvaliable = {
            jan: thisMonth === 0 ? true : false,
            feb: thisMonth === 1 ? true : false,
            mar: thisMonth === 2 ? true : false,
            apr: thisMonth === 3 ? true : false,
            may: thisMonth === 4 ? true : false,
            jun: thisMonth === 5 ? true : false,
            jul: thisMonth === 6 ? true : false,
            aug: thisMonth === 7 ? true : false,
            sep: thisMonth === 8 ? true : false,
            oct: thisMonth === 9 ? true : false,
            nov: thisMonth === 10 ? true : false,
            dec: thisMonth === 11 ? true : false,
        }
        let filtered = ApplyMonths(currentMonth, allFish);
        return filtered.filter(x => CritterIsAvailableDuringHour(date.getHours(), x));
    }
    return allFish;
}

//reused from CritterFilter.ts -- refactor later.
function CritterIsAvailableDuringHour(hour: number, critter: NewFishModel): boolean {
    for(let i = 0; i < critter.catchStartTime.length; i++){
        let possibleHours = [];        
        let endVal = critter.catchEndTime[i];
        let startVal = critter.catchStartTime[i];
        while(startVal !== endVal){
            possibleHours.push(startVal);
            if(startVal === 24){
                startVal = 0;
            }
            startVal++;
        }
        if(possibleHours.includes(hour)){
            return true;
        }
    }
    return false;
}