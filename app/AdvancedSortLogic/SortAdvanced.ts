import { CritterModel } from "../../models/CollectionModels/CritterModel";
import { SortModel } from "../../models/Sort/AdvancedSortCritterModel";

export function SortCritters(critterArray: Array<CritterModel>, sort: SortModel): Array<CritterModel> {
    if(sort.name){
        return ApplyNameSort(critterArray, sort.descending);
    }
    else if(sort.sellPrice){
        return ApplyValueSort(critterArray, sort.descending);
    }
    else if(sort.rarity){
        return ApplyRaritySort(critterArray, sort.descending);
    }
    else if(sort.critterpediaHorizontal){
        return ApplyHorizontalSort(critterArray, sort.descending);
    }
    else if(sort.critterpediaVertical){
        return ApplyVerticalSort(critterArray, sort.descending);
    }
    else {
        return ApplyNameSort(critterArray, false);
    }
}

function ApplyNameSort(fishArray: Array<CritterModel>, orderByDes: boolean): Array<CritterModel>{
    if(orderByDes){
        fishArray = fishArray.sort(function (a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return textB < textA ? -1 : textB > textA ? 1 : 0;
          });
    }
    else{
        fishArray = fishArray.sort(function (a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
          });
    }
    return fishArray;
}

function ApplyValueSort(fishArray: Array<CritterModel>, orderByDes: boolean): Array<CritterModel> {
    if(orderByDes){
        fishArray = fishArray.sort(function (a, b) {
            let valueA = a.value;
            let valueB = b.value;
            return valueB < valueA ? -1 : valueB > valueA ? 1 : 0;
        });    
    }
    else{
        fishArray = fishArray.sort(function (a, b) {
            let valueA = a.value;
            let valueB = b.value;
            return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        });
    }
    return fishArray;
}

function ApplyRaritySort(fishArray: Array<CritterModel>, orderByDes: boolean): Array<CritterModel> {
    if(orderByDes){
        fishArray = fishArray.sort(function (a, b) {
            let valueA = a.rarity;
            let valueB = b.rarity;
            return valueB < valueA ? -1 : valueB > valueA ? 1 : 0;
        });    
    }
    else{
        fishArray = fishArray.sort(function (a, b) {
            let valueA = a.rarity;
            let valueB = b.rarity;
            return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        });
    }
    return fishArray;
}



function ApplyHorizontalSort(fishArray: Array<CritterModel>, orderByDes: boolean): Array<CritterModel> {
    if(orderByDes){
        fishArray = fishArray.sort(function (a, b) {
            let valueA = a.id - 1;
            let valueB = b.id - 1;
            let modA = (valueA % 5);
            let modB = (valueB % 5);
            return modB < modA ? -1 : modB > modA ? 1 : valueB < valueA ? -1 : valueB > valueA ? 1 : 0; 
        });
    }
    else{
        fishArray = fishArray.sort(function (a, b) {
            let valueA = a.id - 1;
            let valueB = b.id - 1;
            let modA = (valueA % 5);
            let modB = (valueB % 5);
            return modA < modB ? -1 : modA > modB ? 1 : valueA < valueB ? -1 : valueA > valueB ? 1 : 0; 
        });
    }
    return fishArray;
}


function ApplyVerticalSort(fishArray: Array<CritterModel>, orderByDes: boolean): Array<CritterModel> {
    if(orderByDes){
        fishArray = fishArray.sort(function (a, b) {
            let valueA = a.id;
            let valueB = b.id;
            return valueB < valueA ? -1 : valueB > valueA ? 1 : 0;
        });
    }
    else{
        fishArray = fishArray.sort(function (a, b) {
            let valueA = a.id;
            let valueB = b.id;
            return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        });
    }
    return fishArray;
}