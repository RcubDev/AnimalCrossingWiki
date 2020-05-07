import { AdvancedSortFilterFishModel } from "../../models/FishScreen/AdvancedSortFilterFishModel";
import { CritterModel } from "../../models/CollectionModels/CritterModel";
import { MonthsAvaliable } from "../../models/fishModel";
import _ from "lodash";
import { List } from "native-base";
import moment from "moment";
import { AdvancedFilterCritterModel } from "../../models/Filter/AdvancedFilterCritterModel";

export function FilterCritters(filterOptions: AdvancedFilterCritterModel, allCritters: Array<CritterModel>, timeOffSet: number = 0): Array<CritterModel> {
    allCritters = ApplyMonths(filterOptions, allCritters);
    allCritters = ApplyRarity(filterOptions.rarity, allCritters);
    allCritters = ApplyCaught(filterOptions.caught, allCritters);
    allCritters = ApplyDonated(filterOptions.donated, allCritters);
    allCritters = ApplyNotCaught(filterOptions.notCaught, allCritters);
    allCritters = ApplyNotDonated(filterOptions.notDonated, allCritters);
    allCritters = ApplyCatchableNow(filterOptions.catchableNow, allCritters, timeOffSet);
    return allCritters;
}

function ApplyMonths(monthsAvail: MonthsAvaliable, allFish: Array<CritterModel>): Array<CritterModel> {
    let newFish: Array<CritterModel> = [];
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

function ApplyRarity(rarity: number, allFish: Array<CritterModel>): Array<CritterModel> {
    if (rarity !== -1) {
        allFish = allFish.filter(x => x.rarity === rarity);
    }
    return allFish;
}

function ApplyCaught(caught: boolean, allFish: Array<CritterModel>): Array<CritterModel> {
    if (caught) {
        allFish = allFish.filter(x => x.caught);
    }
    return allFish;
}

function ApplyDonated(donated: boolean, allFish: Array<CritterModel>): Array<CritterModel> {
    if (donated) {
        allFish = allFish.filter(x => x.donated);
    }
    return allFish;
}

function ApplyNotCaught(notCaught: boolean, allFish: Array<CritterModel>): Array<CritterModel> {
    if (notCaught) {
        allFish = allFish.filter(x => !x.caught);
    }
    return allFish;
}

function ApplyNotDonated(notDonated: boolean, allFish: Array<CritterModel>): Array<CritterModel> {
    if (notDonated) {
        allFish = allFish.filter(x => !x.donated);
    }
    return allFish;
}

function ApplyCatchableNow(catchableNow: boolean, allFish: Array<CritterModel>, timeOffSet: number): Array<CritterModel> {
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
function CritterIsAvailableDuringHour(hour: number, critter: CritterModel): boolean {
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