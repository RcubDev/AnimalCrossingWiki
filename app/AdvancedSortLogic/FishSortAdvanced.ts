import { AdvancedSortFishModel } from "../../models/Sort/AdvancedSortFishModel";
import { NewFishModel } from "../../models/CollectionModels/NewFishModel";
import { SortCritters } from "./SortAdvanced";

export function SortFish(fishArray: Array<NewFishModel>, sort: AdvancedSortFishModel): Array<NewFishModel> {
    if(sort.shadowSize){
        return ApplyShadowSizeSort(fishArray, sort.descending);
    }
    else{
        let sortedFish = SortCritters(fishArray, sort).map(x => x.id);
        return fishArray.sort(function (a, b) {
            return sortedFish.indexOf(a.id) - sortedFish.indexOf(b.id);
        });
    }
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