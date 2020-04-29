import { NewFishModel } from "../../models/CollectionModels/NewFishModel";
import { BugModel } from "../../models/CollectionModels/BugModel";

export type CollectionFilterTypes = NewFishModel | BugModel;

//Type guarding functions
export function isFish(type: CollectionFilterTypes): type is NewFishModel{
    return (type as NewFishModel).catchEndTime !== undefined;
}

export function isListOfFish(type: Array<CollectionFilterTypes>): type is Array<NewFishModel>{
    if(type.length > 0){
        return (type as Array<NewFishModel>)[0].shadowSize !== undefined;
    }
    else{
        return false;
    }
}

export function isListOfBug(type: Array<CollectionFilterTypes>): type is Array<NewFishModel>{
    if(type.length > 0){
        return (type as Array<BugModel>)[0].isBug !== undefined;
    }
    else{
        return false;
    }
}