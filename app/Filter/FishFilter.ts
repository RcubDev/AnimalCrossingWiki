import { NewFishModel } from "../../models/CollectionModels/NewFishModel"
import { BugModel } from "../../models/CollectionModels/BugModel";
import { FilterCollectionCritter } from "./CritterFilter";

export function FilterCollectionFish(type:string, value: string, operation: string, list: Array<NewFishModel>): Array<NewFishModel>{
    switch(type){
        case "size":
        case "shadowSize":
            FilterFishByShadowSize(operation, value, list);
        case "location":
        case "locationName":
            FilterFishByLocation(operation, value, list);
        default:
            let critterFilter = FilterCollectionCritter(type, value, operation, list);
            return list.filter(x => critterFilter.map(y => y.id).includes(x.id));
    }    
}

function FilterFishByShadowSize(operation: string, value: string, list: Array<NewFishModel>): Array<NewFishModel>{
    let numValue = -1;
    if(isNaN(+value)){
        numValue = ChangeShadowNameToNum(value);
    }
    else{
        numValue = +value;
    }
    switch(operation){
        case "=":
            return list.filter(x => x.shadowSize === numValue);
        case ">":
            return list.filter(x => x.shadowSize > numValue);
        case ">=":
            return list.filter(x => x.shadowSize >= numValue);
        case "<":
            return list.filter(x => x.shadowSize < numValue);
        case "<=":
            return list.filter(x => x.shadowSize <= numValue);
        case "!=":
            return list.filter(x => x.shadowSize != numValue);
        default:
            return [];
    }
}


function FilterFishByLocation(operation: string, value: string, list: Array<NewFishModel>): Array<NewFishModel>{
    //TODO Check for valid operation
    let numValue = [-1];
    if(isNaN(+value)){
        numValue = ChangeLocationToNum(value);
    }
    else{
        numValue = [+value];
    }
    switch(operation){
        case "=":
            return list.filter(x => numValue.includes(x.location));
        case "!=":
            return list.filter(x => !numValue.includes(x.location));
        default:
            return [];
    }
}

function ChangeLocationToNum(value: string): Array<number>{
    switch(value.toLowerCase()){
        case "river":
            return [1];
        case "river (mouth)":
        case "mouth":
        case "river mouth":
            return [2];
        case "river (clifftop)":
        case "clifftop":
        case "river clifftop":
            return [3];
        case "pond":
            return [4];
        case "pier":
        case "dock":
            return [5];
        case "sea":
            return [6];
        default:
            return [-1];
    }
}

function ChangeShadowNameToNum(value: string): number{
    switch(value.toLowerCase()){
        case "tiny":
            return 1;
        case "small":
            return 2;
        case "medium":
            return 3;
        case "large":
            return 4;
        case "huge":
            return 5;
        case "gigantic":
            return 6;
        case "narrow":
            return 7
        default:
            return -1;
    }
}
