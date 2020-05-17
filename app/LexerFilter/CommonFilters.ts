import { CommonCollectionModel } from "../../models/CollectionModels/CommonCollectionModel";

function FilterByName<TCollection extends CommonCollectionModel>(value: string, operation: string, currentList: Array<TCollection>): Array<TCollection>{
    switch(operation){
        //TODO Add !%
        case "%":
            return currentList.filter(x => x.name.toLowerCase().includes(value.toLowerCase()));
        case "=":
            return currentList.filter(x => x.name.toLowerCase() === value.toLowerCase());
        case "!=":
            return currentList.filter(x => x.name.toLowerCase() !== value.toLowerCase());
        case "+":
            return currentList.filter(x => x.name.toLowerCase().startsWith(value.toLowerCase()));
        default:
            return [];
    }
}

function FilterByValue<TCollection extends CommonCollectionModel>(value: string, operation: string, currentList: Array<TCollection>): Array<TCollection>{
    //check that value is indeed a number if not a number return []
    if(isNaN(+value)){
        return []
    }
    switch(operation){
        case ">=":
            return currentList.filter(x => x.value >= +value);
        case ">":
            return currentList.filter(x => x.value > +value);
        case "<":
            return currentList.filter(x => x.value < +value);
        case "<=":
            return currentList.filter(x => x.value <= +value);
        case "=":
            return currentList.filter(x => x.value === +value);                                                                                        
        case "!=":
            return currentList.filter(x => x.value !== +value);
        default:
            return currentList;
    }
}

export function FilterCollectionCommon<TCollection extends CommonCollectionModel> (type:string, value: string, operation:string, valuesEnteredWith: Array<TCollection>) {
    switch (type.toLowerCase()) {
        case "value":
            return FilterByValue(value, operation, valuesEnteredWith);
        case "name":
            return FilterByName(value, operation, valuesEnteredWith);
        default: 
            return [];
    }
}