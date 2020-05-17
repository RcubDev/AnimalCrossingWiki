import { FilterModel } from "../../models/Filter/FilterModel";
import { CreatureModel } from "../../models/CollectionModelsV2/creatures";
import { ItemModel } from "../../models/CollectionModelsV2/items";
import { MonthsAvaliable } from "../../models/CollectionModels/CritterCollectionModel";

export function Filter(filter: FilterModel, filterCollection: Array<any>, timeOffSet: number = 0): Array<CreatureModel> | Array<ItemModel> {
    if (filterCollection && filterCollection.length > 0 && filterCollection[0].caught !== undefined) {
        //Creature model only filters
        filterCollection = ApplyShadowSize(filter.shadowSize, filterCollection);
        filterCollection = ApplyCaught(filter.caught, filterCollection);
        filterCollection = ApplyNotCaught(filter.notCaught, filterCollection);
        filterCollection = ApplyMonthFilter(filter.monthsAvailable, filterCollection, true);
        filterCollection = ApplyLocationFish(filter.location, filterCollection);
    }
    if(filterCollection && filterCollection.length > 0 && filterCollection[0].donated !== undefined) {
        //Can be creature or item
        filterCollection = ApplyDonated(filter.donated, filterCollection);
        filterCollection = ApplyNotDonated(filter.notDonated, filterCollection);
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

function ApplyMonthFilter(months: MonthsAvaliable, filterCollection: Array<CreatureModel>, hemisphereIsNorthern: boolean): Array<CreatureModel> {
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