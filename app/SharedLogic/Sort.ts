import { SortModel } from "../../models/Sort/AdvancedSortCritterModel";
import { CreatureModel } from "../../models/CollectionModelsV2/creatures";
import { ItemModel } from "../../models/CollectionModelsV2/items";

export function Sort(sort: SortModel, collection: Array<any>): Array<ItemModel> | Array<CreatureModel> {
    collection = ApplyShadowSizeSort(sort.descending, sort.shadowSize, collection);
    collection = ApplyNameSort(sort.descending, sort.name, collection);
    collection = ApplySellPriceSort(sort.descending, sort.sellPrice, collection);
    collection = ApplyCritterpediaHorizontalSort(sort.descending, sort.critterpediaHorizontal, collection);
    collection = ApplyCritterpediaVerticalSort(sort.descending, sort.critterpediaVertical, collection);
    return collection;
}

export function GetDefaultSortModelCreature(): SortModel {
    return {
        sellPrice: false,
        name: false,
        rarity: false,
        critterpediaHorizontal: false,
        critterpediaVertical: false,
        shadowSize: false,
        ascending: true,
        descending: false
      }
}

export function GetDefaultSortModelItem(): SortModel {
    return {
        sellPrice: false,
        name: false,
        rarity: undefined,
        critterpediaHorizontal: undefined,
        critterpediaVertical: undefined,
        shadowSize: undefined,
        ascending: true,
        descending: false
      }
}

function ApplyShadowSizeSort(isDescending: boolean, shouldSort: boolean | undefined, collection: Array<CreatureModel>): Array<CreatureModel> {
    if(shouldSort){
        if(isDescending){
            collection = collection.sort(function (a, b) {
                let valueA = getShadowSizeNumberFromName(a.shadow);
                let valueB = getShadowSizeNumberFromName(b.shadow);
                return valueB < valueA ? -1 : valueB > valueA ? 1 : 0;
            });    
        }
        else{
            collection = collection.sort(function (a, b) {
                let valueA = getShadowSizeNumberFromName(a.shadow);
                let valueB = getShadowSizeNumberFromName(b.shadow);
                return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
            });
        }
    }
    
    return collection;
}

function getShadowSizeNumberFromName(shadowSizeName: string | undefined): number{
    switch (shadowSizeName) {
        case "X-Small":
            return 1;
        case "Small":
            return 2;
        case "Medium":
        case "Medium w/Fin":
            return 3;
        case "Large w/Fin":
        case "Large":
            return 4;
        case "X-Large":
            return 5
        case "XX-Large":
            return 6;
        case "Long":
            return 7;
        default:
            console.warn('No shadow size found on creature.')
            return -1;
    }
}

function ApplyNameSort(isDescending: boolean, shouldSort: boolean | undefined, collection: Array<ItemModel> | Array<CreatureModel>): Array<ItemModel> | Array<CreatureModel> {
    if(shouldSort){
        if(isDescending){
            collection = collection.sort(function (a: CreatureModel | ItemModel, b: CreatureModel | ItemModel) {
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                return textB < textA ? -1 : textB > textA ? 1 : 0;
              });
        }
        else{
            collection = collection.sort(function (a: CreatureModel | ItemModel, b: CreatureModel | ItemModel) {
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                return textA < textB ? -1 : textA > textB ? 1 : 0;
              });
        }
    }
   
    return collection;
}

function ApplySellPriceSort(isDescending: boolean, shouldSort: boolean | undefined, collection: Array<ItemModel> | Array<CreatureModel>): Array<ItemModel> | Array<CreatureModel> {
    if(shouldSort){
        if(isDescending){
            collection = collection.sort(function (a: any , b: any) {
                let valueA = getSellPrice(a);
                let valueB = getSellPrice(b);

                return valueB < valueA ? -1 : valueB > valueA ? 1 : 0;
            });    
        }
        else{
            collection = collection.sort(function (a: any , b: any) {
                let valueA = getSellPrice(a);
                let valueB = getSellPrice(b);
               
                return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
            });
        }
    }
    
    return collection;
}

function getSellPrice(item: any): number {
    let value = 0;
    if(item.sell){
        value = (item as CreatureModel).sell;
    }
    else if(item.variants){
        let castedItem = item as ItemModel;
        value = castedItem.variants[0].sell !== null ? castedItem.variants[0].sell: 0;
    }
    return value;
}

function ApplyCritterpediaHorizontalSort(isDescending: boolean, shouldSort: boolean | undefined, collection: Array<CreatureModel>): Array<CreatureModel> {
    if(shouldSort){
        if(isDescending){
            collection = collection.sort(function (a, b) {
                let valueA = a.num - 1;
                let valueB = b.num - 1;
                let modA = (valueA % 5);
                let modB = (valueB % 5);
                return modB < modA ? -1 : modB > modA ? 1 : valueB < valueA ? -1 : valueB > valueA ? 1 : 0; 
            });
        }
        else{
            collection = collection.sort(function (a, b) {
                let valueA = a.num - 1;
                let valueB = b.num - 1;
                let modA = (valueA % 5);
                let modB = (valueB % 5);
                return modA < modB ? -1 : modA > modB ? 1 : valueA < valueB ? -1 : valueA > valueB ? 1 : 0; 
            });
        }
    }
    return collection;
}

function ApplyCritterpediaVerticalSort(isDescending: boolean, shouldSort: boolean | undefined, collection: Array<CreatureModel>): Array<CreatureModel> {
    if(shouldSort){
        if(isDescending){
            collection = collection.sort(function (a, b) {
                let valueA = a.num;
                let valueB = b.num;
                return valueB < valueA ? -1 : valueB > valueA ? 1 : 0;
            });
        }
        else{
            collection = collection.sort(function (a, b) {
                let valueA = a.num;
                let valueB = b.num;
                return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
            });
        }
    }
    return collection;    
}