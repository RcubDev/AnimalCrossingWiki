import { CritterCollectionCardModel } from "../../models/FishScreen/FishCardModel";
import _ from "lodash";
const startScope:Array<string> = ["("];
const endScope: Array<string> = [")"];
const startValues: Array<string> = ["=", ">", "<", ">=", "<=", "!", "%"];
const endValues:Array<string> = [")", "]", "&", "|"];
export function filterCollectionByTextSpecial(text: string, critterCollection: Array<CritterCollectionCardModel>): Array<CritterCollectionCardModel> {
    //Read text until key word is found
    let currentString = "";
    let scopedKeyWord = "";
    let valuesEnteredWith: Array<CritterCollectionCardModel> = critterCollection;
    let valuesWaitingForConjunction: Array<CritterCollectionCardModel> = [];
    let valuesToReturnWith: Array<CritterCollectionCardModel> = [];
    let index = 0;
    let type = "";
    let shouldApplyConjunction = false;
    let nextConjunctionType = "";
    let valuesAreWaitingForConjuction = false;
    while(index < text.length){
        let scopedResults:Array<CritterCollectionCardModel> = [];
        if(startScope.includes(text[index])){
            let endIndexNumber = FindMatchingParen(text.substr(index + 1));
            if(endIndexNumber === -1){
                throw "No matching end paren. Exiting.";                    
            }
            
            //valuesToReturnWith = valuesWaitingForConjunction;
            //let valuesWaiting = valuesWaitingForConjunction;                
            if(valuesAreWaitingForConjuction){
                valuesToReturnWith = _.union(valuesToReturnWith, valuesWaitingForConjunction);
            }
            valuesWaitingForConjunction = filterCollectionByTextSpecial(text.substr(index + 1), valuesEnteredWith);      
            //valuesToReturnWith = valuesToReturnWith.concat(valuesWaitingForConjunction);
            //be aware of index out of bounds
            let newIndex = index + endIndexNumber;
            index = newIndex;
            if(nextConjunctionType === ""){
                //index += this.FindMatchingParen(text.substr(index + 1));
                if(text[index + 1] === "&" || text[index + 1] === "|") {
                    valuesAreWaitingForConjuction = true;
                    index++;
                    nextConjunctionType = text[index];
                    valuesToReturnWith = valuesWaitingForConjunction;
                }
            }
            else {
                valuesToReturnWith = ApplyConjunction(nextConjunctionType, valuesToReturnWith, valuesWaitingForConjunction);
                valuesAreWaitingForConjuction =  false;
                if(text[index + 1] === "&" || text[index + 1] === "|") {
                    valuesAreWaitingForConjuction = true;
                    index++;
                    nextConjunctionType = text[index];                        
                }
            }
        }
        else if(text[index] === ")"){
            if(valuesAreWaitingForConjuction){
                let newRes = FilterCollection(type, currentString, valuesEnteredWith);
                valuesToReturnWith = valuesToReturnWith.concat(ApplyConjunction(nextConjunctionType, valuesWaitingForConjunction, newRes));
            }
            else if(type !== "" && currentString !== ""){
                valuesToReturnWith = FilterCollection(type, currentString, valuesEnteredWith);
            }                
            return valuesToReturnWith;
        }
        else if(text[index] === "&"){
            if(valuesAreWaitingForConjuction){
                let newRes = FilterCollection(type, currentString, valuesEnteredWith);
                valuesToReturnWith = valuesToReturnWith.concat(ApplyConjunction(nextConjunctionType, valuesWaitingForConjunction, newRes));
            }
            else{
                valuesWaitingForConjunction = FilterCollection(type, currentString, valuesEnteredWith);
                valuesAreWaitingForConjuction = true;
            }
            currentString  ="";
            nextConjunctionType = "&";                                                                    
        }
        else if(text[index] === "|"){
            if(valuesAreWaitingForConjuction){
                let newRes = FilterCollection(type, currentString, valuesEnteredWith);
                valuesToReturnWith = valuesToReturnWith.concat(ApplyConjunction(nextConjunctionType, valuesWaitingForConjunction, newRes));
                valuesAreWaitingForConjuction = false;
            }
            else{
                valuesWaitingForConjunction = FilterCollection(type, currentString, valuesEnteredWith);
                valuesAreWaitingForConjuction = true;
            }
            currentString = "";
            nextConjunctionType = "|";
        }
        else if(startValues.includes(text[index])){
            console.log(currentString);
            type = currentString;
            currentString = text[index];
            if(index + 1 < text.length && startValues.includes(text[index + 1])){
                currentString = currentString.concat(text[index + 1]);
                index++;
            }
        }
        else{
            currentString  = currentString.concat(text[index]);
        }


        index++;
    }
    if(valuesAreWaitingForConjuction){
        let lastCall = FilterCollection(type, currentString, valuesEnteredWith);
        valuesToReturnWith = ApplyConjunction(nextConjunctionType, valuesWaitingForConjunction, lastCall);
    }
    console.log('returning scopped results');
    return valuesToReturnWith;
}

function ApplyConjunction(conjunction: string, leftSide: Array<CritterCollectionCardModel>, rightSide: Array<CritterCollectionCardModel>) {
    if(conjunction === "|"){
        return leftSide.concat(rightSide);
    }
    else if(conjunction === "&"){
        return leftSide.filter(x => rightSide.indexOf(x) > -1);
    }
    else{
        console.error('How did you enter here?');
    }
    return rightSide;
}

function FindMatchingParen(textAfterOpenParen: string): number{
    let index = -1;
    let numberOfOpenParens = 1;
    let numberOfClosedParens = 0;
    for(let i = 0; i < textAfterOpenParen.length; i++){
        if(textAfterOpenParen[i] === "("){
            numberOfOpenParens++;
        }
        else if(textAfterOpenParen[i] === ")"){
            numberOfClosedParens++
        }
        if(numberOfOpenParens === numberOfClosedParens){
            return i + 1;
        }
    }

    return index;
}

//TODO: Allow for passing in of FilterCollection() function and use that callback instead of these defaults.
function FilterCollection(type:string, restOfString: string, valuesEnteredWith: Array<CritterCollectionCardModel>): Array<CritterCollectionCardModel>{
    let operation = restOfString[0];
    if(operation === ">" || operation === "<" || operation === "!"){
        if(restOfString[1] === "="){
            operation = operation.concat("=");
        }            
    }
    else if(operation === "["){
        operation = "range";
    }
    //TODO: Add Operation + Type validator

    restOfString = restOfString.substr(operation.length);
    switch (type.toLowerCase()) {
        case "value":
            return FilterByValue(restOfString, operation, valuesEnteredWith);
        case "name":
            return FilterByName(restOfString, operation, valuesEnteredWith);
        case "location":
            return FilterByLocation(restOfString, operation, valuesEnteredWith);
        case "shadowsize":
        case "size":
            return FilterByShadowSize(restOfString, operation, valuesEnteredWith);
        case "rarity":
            return FilterByRarity(restOfString, operation, valuesEnteredWith);
        case "weather":
            return FilterByWeather(restOfString, operation, valuesEnteredWith);
        case "time":
            return FilterByTime(restOfString, operation, valuesEnteredWith);
        case "now":
            return FilterByNow(restOfString, operation, valuesEnteredWith);
        case "month":
            return FilterByMonth(restOfString, operation, valuesEnteredWith);
        case "caught":
            return FilterByCaught(restOfString, operation, valuesEnteredWith);
        case "donated":
            return FilterByDonated(restOfString, operation, valuesEnteredWith);
        default:
            return valuesEnteredWith;
    }

}

function FilterByLocation(value: string, operation: string, currentList: Array<CritterCollectionCardModel>): Array<CritterCollectionCardModel>{
    return [];
}

function FilterByShadowSize(value: string, operation: string, currentList: Array<CritterCollectionCardModel>): Array<CritterCollectionCardModel>{
    return [];
}

function FilterByRarity(value: string, operation: string, currentList: Array<CritterCollectionCardModel>): Array<CritterCollectionCardModel>{
    return [];
}

function FilterByWeather(value: string, operation: string, currentList: Array<CritterCollectionCardModel>): Array<CritterCollectionCardModel>{
    return [];
}

function FilterByTime(value: string, operation: string, currentList: Array<CritterCollectionCardModel>): Array<CritterCollectionCardModel>{
    return [];
}

function FilterByNow(value: string, operation: string, currentList: Array<CritterCollectionCardModel>): Array<CritterCollectionCardModel>{
    return [];
}

function FilterByMonth(value: string, operation: string, currentList: Array<CritterCollectionCardModel>): Array<CritterCollectionCardModel>{
    return [];
}

function FilterByCaught(value: string, operation: string, currentList: Array<CritterCollectionCardModel>): Array<CritterCollectionCardModel>{
    return [];
}

function FilterByDonated(value: string, operation: string, currentList: Array<CritterCollectionCardModel>): Array<CritterCollectionCardModel>{
    return [];
}

function FilterByName(value: string, operation: string, currentList: Array<CritterCollectionCardModel>): Array<CritterCollectionCardModel>{
    switch(operation){
        //TODO Add !%
        case "%":
            return currentList.filter(x => x.collection.name.toLowerCase().includes(value.toLowerCase()));
        case "=":
            return currentList.filter(x => x.collection.name.toLowerCase() === value.toLowerCase());
        case "!=":
            return currentList.filter(x => x.collection.name.toLowerCase() !== value.toLowerCase());
        default:
            return [];
    }
}

function FilterByValue(value: string, operation: string, currentList: Array<CritterCollectionCardModel>): Array<CritterCollectionCardModel>{
    //check that value is indeed a number if not a number return []
    if(isNaN(+value)){
        return []
    }
    switch(operation){
        case ">=":
            return currentList.filter(x => x.collection.value >= +value);
        case ">":
            return currentList.filter(x => x.collection.value > +value);
        case "<":
            return currentList.filter(x => x.collection.value < +value);
        case "<=":
            return currentList.filter(x => x.collection.value <= +value);
        case "=":
            return currentList.filter(x => x.collection.value === +value);                                                                                        
        case "!=":
            return currentList.filter(x => x.collection.value !== +value);
        default:
            return currentList;
    }
}


function readUntilSpecialCharacter(character: string){
    if(character == "]"){

    }
}

function GetInnerFilterString(text: string): number{
    for(let i = 0; i < text.length; i ++){
        if(endScope.includes(text[i])){
            return i;
        }
    }
    return -1;
}    