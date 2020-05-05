// fishArray = fishArray.sort(function (a, b) {
//     var textA = a.name.toUpperCase();
//     var textB = b.name.toUpperCase();
//     return textA < textB ? -1 : textA > textB ? 1 : 0;
//   });

import { NewFishModel } from "../../models/CollectionModels/NewFishModel";
import { AdvancedSortFishModel } from "../../models/FishScreen/AdvancedSortFishModel";
import { TextBase } from "react-native";

export function SortAdvancedFish(fishArray: Array<NewFishModel>, sort: AdvancedSortFishModel): Array<NewFishModel> {
    if(sort.name){
        return ApplyNameSort(fishArray, sort.descending);
    }
    else if(sort.value){
        return ApplyValueSort(fishArray, sort.descending);
    }
    else if(sort.rarity){
        return ApplyRaritySort(fishArray, sort.descending);
    }
    else if(sort.shadowSize){
        return ApplyShadowSizeSort(fishArray, sort.descending);
    }
    else if(sort.critterpediaHorizontal){
        return ApplyHorizontalSort(fishArray, sort.descending);
    }
    else if(sort.critterpediaVertical){
        return ApplyVerticalSort(fishArray, sort.descending);
    }
    else {
        return ApplyNameSort(fishArray, false);
    }
}

function ApplyNameSort(fishArray: Array<NewFishModel>, orderByDes: boolean): Array<NewFishModel>{
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

function ApplyValueSort(fishArray: Array<NewFishModel>, orderByDes: boolean): Array<NewFishModel> {
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

function ApplyRaritySort(fishArray: Array<NewFishModel>, orderByDes: boolean): Array<NewFishModel> {
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

function ApplyShadowSizeSort(fishArray: Array<NewFishModel>, orderByDes: boolean): Array<NewFishModel> {
    if(orderByDes){
        fishArray = fishArray.sort(function (a, b) {
            let valueA = a.shadowSize;
            let valueB = b.shadowSize;
            return valueB < valueA ? -1 : valueB > valueA ? 1 : 0;
        });    
    }
    else{
        fishArray = fishArray.sort(function (a, b) {
            let valueA = a.shadowSize;
            let valueB = b.shadowSize;
            return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        });
    }
    return fishArray;
}

function ApplyHorizontalSort(fishArray: Array<NewFishModel>, orderByDes: boolean): Array<NewFishModel> {
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


function ApplyVerticalSort(fishArray: Array<NewFishModel>, orderByDes: boolean): Array<NewFishModel> {
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