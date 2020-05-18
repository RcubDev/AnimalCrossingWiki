import { FilterModel } from "../../models/Filter/FilterModel";
import { CreatureModel } from "../../models/CollectionModelsV2/creatures";
import { ItemModel } from "../../models/CollectionModelsV2/items";
import moment from "moment";
import { MonthsAvaliableModel } from "../../models/CollectionModelsV2/MonthsAvailableModel";
import { ReactionModel } from "../../models/CollectionModelsV2/reactions";

export function Filter(filter: FilterModel, filterCollection: Array<any>, timeOffSet: number = 0, isNorthernHemisphere: boolean = true): Array<CreatureModel> | Array<ItemModel> | Array<ReactionModel> {
    if (filterCollection && filterCollection.length > 0 && filterCollection[0].caught !== undefined) {
        //Creature model only filters
        filterCollection = ApplyShadowSize(filter.shadowSize, filterCollection);
        filterCollection = ApplyCaught(filter.caught, filterCollection);
        filterCollection = ApplyNotCaught(filter.notCaught, filterCollection);
        filterCollection = ApplyMonthFilter(filter.monthsAvailable, filterCollection, true);
        filterCollection = ApplyLocation(filter.location, filterCollection);
        filterCollection = ApplyCatchableNow(filter.catchableNow, filterCollection, timeOffSet, isNorthernHemisphere);
    }
    if(filterCollection && filterCollection.length > 0 && filterCollection[0].donated !== undefined) {
        //Can be creature or item
        filterCollection = ApplyDonated(filter.donated, filterCollection);
        filterCollection = ApplyNotDonated(filter.notDonated, filterCollection);
    }
    if(filterCollection && filterCollection.length > 0 && (filterCollection[0] as ItemModel).catalogged !== undefined){
        filterCollection = ApplyCatalogged(filter.catalogged, filterCollection);
        filterCollection = ApplyNotCatalogged(filter.notCatalogged, filterCollection);
    }

    if(filterCollection && filterCollection.length > 0 && (filterCollection[0] as ReactionModel).obtained !== undefined){
        filterCollection = ApplyObtained(filter.obtained, filterCollection);
        filterCollection = ApplyNotObtained(filter.notObtained, filterCollection);
    }

    return filterCollection;
}

export function GetDefaultFilterModelCreature(): FilterModel {
    return {
        caught: false,
        donated: false,
        notCaught: false,
        notDonated: false,
        availableNow: false,
        obtained: undefined,
        notObtained: undefined,
        catalogged: undefined,
        notCatalogged: undefined,
        location: -1,
        rarity: -1,
        value: 0,
        catchableNow: false,
        shadowSize: -1,
        monthsAvailable: {
          jan: false,
          feb: false,
          mar: false,
          apr: false,
          may: false,
          jun: false,
          jul: false,
          aug: false,
          sep: false,
          oct: false,
          nov: false,
          dec: false
        }
      }
}

export function GetDefaultFilterModelItem(): FilterModel {
    return {
        donated: false,
        notDonated: false,
        location: undefined,
        rarity: undefined,
        value: undefined,
        obtained: undefined,
        notObtained: undefined,
        catalogged: undefined,
        notCatalogged: undefined,
        catchableNow: undefined,
        shadowSize: undefined,
        monthsAvailable: {
            jan: undefined,
            feb: undefined,
            mar: undefined,
            apr: undefined,
            may: undefined,
            jun: undefined,
            jul: undefined,
            aug: undefined,
            sep: undefined,
            oct: undefined,
            nov: undefined,
            dec: undefined
        },         
        caught: undefined,
        notCaught: undefined,
        availableNow: undefined
    }
}

function ApplyDonated(donated: boolean | undefined, filterCollection: any): Array<any> {
    if(donated){
        return filterCollection.filter((x: { donated: boolean; }) => x.donated === true);
    }
    else{
        return filterCollection;
    }
}

function ApplyNotDonated(notDonated: boolean | undefined, filterCollection: any): Array<any> {
    if(notDonated){
        return filterCollection.filter((x: { donated: boolean; }) => x.donated === false);
    }
    else{
        return filterCollection;
    }
}

function ApplyCaught(caught: boolean | undefined, filterCollection: Array<CreatureModel>): Array<any> {
    if(caught){
        return filterCollection.filter(x => x.caught);
    }
    else{
        return filterCollection;
    }
}

function ApplyNotCaught(notCaught: boolean | undefined, filterCollection: Array<CreatureModel>): Array<any> {
    if(notCaught){
        return filterCollection.filter(x => !x.caught);
    }
    else{
        return filterCollection;
    }
}

function ApplyCatalogged(catalogged: boolean | undefined, filterCollection: Array<ItemModel>): Array<any> {
    if(catalogged){
        return filterCollection.filter(x => x.catalogged);
    }
    else{
        return filterCollection;
    }
}


function ApplyNotCatalogged(notCatalogged: boolean | undefined, filterCollection: Array<ItemModel>): Array<any> {
    if(notCatalogged){
        return filterCollection.filter(x => !x.catalogged);
    }
    else{
        return filterCollection;
    }
}

function ApplyObtained(obtained: boolean | undefined, filterCollection: Array<ReactionModel>): Array<ReactionModel> {
    if(obtained){
        return filterCollection.filter(x => x.obtained);
    }
    else{
        return filterCollection;
    }
}

function ApplyNotObtained(notObtained: boolean | undefined, filterCollection: Array<ReactionModel>): Array<ReactionModel> {
    if(notObtained){
        return filterCollection.filter(x => !x.obtained);
    }
    else{
        return filterCollection;
    }
}


function ApplyShadowSize(shadowSize: number | undefined, filterCollection: Array<CreatureModel>): Array<any> {    
    switch (shadowSize) {
        case 1:
            return filterCollection.filter(x => x.shadow === "X-Small");
        case 2:
            return filterCollection.filter(x => x.shadow === "Small");
        case 3:
            return filterCollection.filter(x => x.shadow === "Medium" || x.shadow === "Medium w/Fin");
        case 4:
            return filterCollection.filter(x => x.shadow === "Large" || x.shadow === "Large w/Fin");
        case 5:
            return filterCollection.filter(x => x.shadow === "X-Large")
        case 6:
            return filterCollection.filter(x => x.shadow === "XX-Large");
        case 7:
            return filterCollection.filter(x => x.shadow === "Long");
        default:
            return filterCollection;
    }
}

function ApplyLocation(location: number | undefined, filterCollection: Array<CreatureModel>): Array<any> {
    switch(filterCollection[0].sourceSheet){
        case "Bugs":
            return ApplyLocationBugs(location, filterCollection);
        case "Fish":
            return ApplyLocationFish(location, filterCollection);
        default:
            return filterCollection;
    }
}

function ApplyLocationFish(location: number | undefined, filterCollection: Array<CreatureModel>): Array<any>{
    switch (location) {
        case 1:
            return filterCollection.filter(x => x.whereHow === "River");
        case 2:
            return filterCollection.filter(x => x.whereHow === "River (mouth)");
        case 3:
            return filterCollection.filter(x => x.whereHow === "River (clifftop)");
        case 4:
            return filterCollection.filter(x => x.whereHow === "Pond");
        case 5:
            return filterCollection.filter(x => x.whereHow === "Pier");
        case 6:
            return filterCollection.filter(x => x.whereHow === "Sea");
        default:
            return filterCollection;
    }
}

function ApplyLocationBugs(location: number | undefined, filterCollection: Array<CreatureModel>): Array<any>{
    switch (location) {
        case 1:
            return filterCollection.filter(x => x.whereHow === "");
        case 2:
            return filterCollection.filter(x => x.whereHow === "");
        case 3:
            return filterCollection.filter(x => x.whereHow === "");
        case 4:
            return filterCollection.filter(x => x.whereHow === "");
        case 5:
            return filterCollection.filter(x => x.whereHow === "");
        case 6:
            return filterCollection.filter(x => x.whereHow === "");
        default:
            return filterCollection;
    }
}

function ApplyMonthFilter(months: MonthsAvaliableModel, filterCollection: Array<CreatureModel>, hemisphereIsNorthern: boolean): Array<CreatureModel> {
    let monthNumArray: Array<number> = [];
    if(months.jan){
        monthNumArray.push(1);
    } 
    if(months.feb){
        monthNumArray.push(2);
    } 
    if(months.mar){
        monthNumArray.push(3);
    } 
    if(months.apr){
        monthNumArray.push(4);
    } 
    if(months.may){
        monthNumArray.push(5);
    } 
    if(months.jun){
        monthNumArray.push(6);
    } 
    if(months.jul){
        monthNumArray.push(7);
    } 
    if(months.aug){
        monthNumArray.push(8);
    } 
    if(months.sep){
        monthNumArray.push(9);
    } 
    if(months.oct){
        monthNumArray.push(10);
    } 
    if(months.nov){
        monthNumArray.push(11);
    } 
    if(months.dec){
        monthNumArray.push(12);
    } 
    if(monthNumArray.length > 0){
        if(hemisphereIsNorthern){
            return filterCollection.filter(x => x.activeMonths.northern.map(y => y.month).some(z => monthNumArray.includes(z)));    
        }
        else {
            return filterCollection.filter(x => x.activeMonths.southern.map(y => y.month).some(z => monthNumArray.includes(z)));    
        }
    }
    else{
        return filterCollection;
    }

}

function ApplyCatchableNow(catchableNow: boolean | undefined, collection: CreatureModel[], timeOffSet: number, isNorthernHemisphere: boolean): CreatureModel[] {
    if(catchableNow){
        let date = moment(new Date()).add(timeOffSet, 'minutes').toDate();
        let thisMonth = date.getMonth();
        let currentMonth: MonthsAvaliableModel = {
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
        debugger;
        let filtered = ApplyMonthFilter(currentMonth, collection, isNorthernHemisphere);
        return filtered.filter(x => CritterIsAvailableDuringHour(date.getHours(), thisMonth + 1, x, isNorthernHemisphere));
    }

    return collection;
}
function CritterIsAvailableDuringHour(hour: number, month: number, creature: CreatureModel, isNorthernHemisphere: boolean): boolean {
    let currentMonthCatchTimes = isNorthernHemisphere ? creature.activeMonths.northern.find(x => x.month === month) : creature.activeMonths.southern.find(x => x.month === month);
    debugger;
    let creatureAvailable = false;
    if(currentMonthCatchTimes){
        currentMonthCatchTimes.activeHours.forEach(element => {
            let startTime = +element[0];
            let endTime = +element[1];
            //0 and 0 = all day
            if(startTime === 0 && endTime === 0){
                creatureAvailable = true;
            }
            while(startTime !== endTime){
                if(startTime === 24){
                    startTime = 0;
                }
                if(startTime === hour){
                    creatureAvailable = true;
                }
                startTime++;
            }                
        });
    }
    return creatureAvailable
}