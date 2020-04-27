import _ from "lodash";
import { CommonCollectionModel } from "../../models/CollectionModels/CommonCollectionModel";
const startScope:Array<string> = ["("];
const endScope: Array<string> = [")"];
const startValues: Array<string> = ["=", ">", "<", ">=", "<=", "!", "%"];
const endValues:Array<string> = [")", "]", "&", "|"];
export type filterFunctionType<TCollection> = (type: string, value: string, operation: string) => Array<TCollection>

export function filterCollectionByTextSpecial<TCollection extends CommonCollectionModel>(text: string, critterCollection: Array<TCollection>, callback: filterFunctionType<TCollection>): Array<TCollection> {
    //Read text until key word is found
    let currentString = "";
    let scopedKeyWord = "";
    let valuesEnteredWith: Array<TCollection> = critterCollection;
    let valuesWaitingForConjunction: Array<TCollection> = [];
    let valuesToReturnWith: Array<TCollection> = [];
    let index = 0;
    let type = "";
    let shouldApplyConjunction = false;
    let nextConjunctionType = "";
    let valuesAreWaitingForConjuction = false;
    while(index < text.length){
        let scopedResults:Array<TCollection> = [];
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
            valuesWaitingForConjunction = filterCollectionByTextSpecial(text.substr(index + 1), valuesEnteredWith, callback);
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
                let newRes = FilterCollection(type, currentString, valuesEnteredWith, callback);
                valuesToReturnWith = valuesToReturnWith.concat(ApplyConjunction(nextConjunctionType, valuesWaitingForConjunction, newRes));
            }
            else if(type !== "" && currentString !== ""){
                valuesToReturnWith = FilterCollection(type, currentString, valuesEnteredWith, callback);
            }                
            return valuesToReturnWith;
        }
        else if(text[index] === "&"){
            if(valuesAreWaitingForConjuction){
                let newRes = FilterCollection(type, currentString, valuesEnteredWith, callback);
                valuesToReturnWith = valuesToReturnWith.concat(ApplyConjunction(nextConjunctionType, valuesWaitingForConjunction, newRes));
            }
            else{
                valuesWaitingForConjunction = FilterCollection(type, currentString, valuesEnteredWith, callback);
                valuesAreWaitingForConjuction = true;
            }
            currentString  ="";
            nextConjunctionType = "&";                                                                    
        }
        else if(text[index] === "|"){
            if(valuesAreWaitingForConjuction){
                let newRes = FilterCollection(type, currentString, valuesEnteredWith, callback);
                valuesToReturnWith = valuesToReturnWith.concat(ApplyConjunction(nextConjunctionType, valuesWaitingForConjunction, newRes));
                valuesAreWaitingForConjuction = false;
            }
            else{
                valuesWaitingForConjunction = FilterCollection(type, currentString, valuesEnteredWith, callback);
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
        let lastCall = FilterCollection(type, currentString, valuesEnteredWith, callback);
        valuesToReturnWith = ApplyConjunction(nextConjunctionType, valuesWaitingForConjunction, lastCall);
    }
    console.log('returning scopped results');
    return valuesToReturnWith;
}

function ApplyConjunction<TCollection>(conjunction: string, leftSide: Array<TCollection>, rightSide: Array<TCollection>) {
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

function FilterCollection<TCollection>(type:string, restOfString: string, valuesEnteredWith: Array<TCollection>, callback: filterFunctionType<TCollection>): Array<TCollection>{
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
    // return callback.apply(type, value, operation);    
    return callback.apply(callback, [type, value, operation]);
}