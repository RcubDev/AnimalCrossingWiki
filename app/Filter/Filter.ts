import _ from "lodash";
import { CommonCollectionModel } from "../../models/CollectionModels/CommonCollectionModel";
import { FilterCollectionFish } from "./FishFilter";
import { NewFishModel } from "../../models/CollectionModels/NewFishModel";
import { BugModel } from "../../models/CollectionModels/BugModel";
import { CollectionFilterTypes, isListOfFish, isListOfBug } from "./FilterTypes";
const startScope:Array<string> = ["("];
const endScope: Array<string> = [")"];
const startValues: Array<string> = ["=", ">", "<", ">=", "<=", "!", "%", ":", "+"];
const endValues:Array<string> = [")", "]", "&", "|"];

export function filterCollectionByTextSpecial(text: string, collection: Array<CollectionFilterTypes>): Array<CollectionFilterTypes> {
    //Read text until key word is found
    let currentString = "";
    let scopedKeyWord = "";
    let valuesEnteredWith: Array<CollectionFilterTypes> = collection;
    let valuesWaitingForConjunction: Array<CollectionFilterTypes> = [];
    let valuesToReturnWith: Array<CollectionFilterTypes> = [];
    let index = 0;
    let type = "";
    let shouldApplyConjunction = false;
    let nextConjunctionType = "";
    let valuesAreWaitingForConjuction = false;
    while(index < text.length){
        let scopedResults:Array<CollectionFilterTypes> = [];
        if(startScope.includes(text[index])){
            let endIndexNumber = FindMatchingParen(text.substr(index + 1));
            if(endIndexNumber === -1){
                throw "No matching end paren. Exiting.";                    
            }
            
            if(valuesAreWaitingForConjuction){
                valuesToReturnWith = _.union(valuesToReturnWith, valuesWaitingForConjunction);
            }
            valuesWaitingForConjunction = filterCollectionByTextSpecial(text.substr(index + 1), valuesEnteredWith);
            debugger;
            //be aware of index out of bounds
            let newIndex = index + endIndexNumber;
            index = newIndex;
            if(nextConjunctionType === ""){
                if(text[index + 1] === "&" || text[index + 1] === "|") {
                    valuesAreWaitingForConjuction = true;
                    index++;
                    nextConjunctionType = text[index];
                    valuesToReturnWith = valuesWaitingForConjunction;
                }
                else{
                    valuesToReturnWith = _.union(valuesToReturnWith, valuesWaitingForConjunction);
                    index--;
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
                let newRes1 = FilterCollection(type, currentString, valuesEnteredWith);
                valuesToReturnWith = _.union(valuesToReturnWith, ApplyConjunction(nextConjunctionType, valuesWaitingForConjunction, newRes1));
            }
            else if(type !== "" && currentString !== ""){
                valuesToReturnWith = FilterCollection(type, currentString, valuesEnteredWith);
            }                
            return valuesToReturnWith;
        }
        else if(text[index] === "&"){
            if(valuesAreWaitingForConjuction){
                let newRes2 = FilterCollection(type, currentString, valuesEnteredWith);
                valuesToReturnWith = _.union(valuesToReturnWith, ApplyConjunction(nextConjunctionType, valuesWaitingForConjunction, newRes2));
                valuesAreWaitingForConjuction = false;
                nextConjunctionType = "";
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
                valuesToReturnWith = _.union(valuesToReturnWith, ApplyConjunction(nextConjunctionType, valuesWaitingForConjunction, newRes));
                valuesAreWaitingForConjuction = false;
                nextConjunctionType = "";
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
        debugger;
        let lastCall = FilterCollection(type, currentString, valuesEnteredWith);
        valuesToReturnWith = ApplyConjunction(nextConjunctionType, valuesWaitingForConjunction, lastCall);
    }
    else if(type !== "" && currentString !== null){
        debugger;
        let lastCall = FilterCollection(type, currentString, valuesEnteredWith);
        valuesToReturnWith = _.union(valuesToReturnWith, lastCall);
    }
    console.log('returning scopped results');
    return valuesToReturnWith;
}

function ApplyConjunction(conjunction: string, leftSide: Array<CollectionFilterTypes>, rightSide: Array<CollectionFilterTypes>) {
    if(conjunction === "|"){
        return leftSide.concat(rightSide);
    }
    else if(conjunction === "&"){
        return leftSide.filter(x => rightSide.indexOf(x) > -1);
    }
    else{
        console.warn('How did you enter here?');
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

function FilterCollection(type:string, restOfString: string, valuesEnteredWith: Array<CollectionFilterTypes>): Array<CollectionFilterTypes>{
    let operation = restOfString[0];
    if(operation === ">" || operation === "<" || operation === "!"){
        if(restOfString[1] === "="){
            operation = operation.concat("=");
        }            
    }
    else if(operation === "["){
        operation = "range";
    }

    let value = restOfString.substr(operation.length);

    if(isListOfFish(valuesEnteredWith)){
        return FilterCollectionFish(type, value, operation, valuesEnteredWith);
    }
    else if(isListOfBug(valuesEnteredWith)){
        //Return filter collection bugs
    }
    return [];
}
