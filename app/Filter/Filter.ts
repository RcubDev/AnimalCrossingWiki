import _ from "lodash";
import { CommonCollectionModel } from "../../models/CollectionModels/CommonCollectionModel";
import { FilterCollectionFish } from "./FishFilter";
import { NewFishModel } from "../../models/CollectionModels/NewFishModel";
import { BugModel } from "../../models/CollectionModels/BugModel";
import { CollectionFilterTypes, isListOfFish, isListOfBug } from "./FilterTypes";
import { GetNextToken, Token, OPERATION } from "./Lexer";
const startScope:Array<string> = ["("];
const endScope: Array<string> = [")"];
const startValues: Array<string> = ["=", ">", "<", ">=", "<=", "!", "%", ":", "+"];
const endValues:Array<string> = [")", "]", "&", "|"];

export function filterCollectionByTextSpecial(text: string, collection: Array<CollectionFilterTypes>): Array<CollectionFilterTypes> {
    //Read text until key word is found            
    let startToken: Token |undefined = GetNextToken(text);
    let currentToken: Token | undefined = startToken;
    let currentConjunction: string = "";
    let currentType: string = "";
    let currentOperation: string = "";
    let leftSide: Array<CollectionFilterTypes> = collection;     
    while(currentToken !== undefined){
        if(currentToken.type === "operation"){
            currentOperation = currentToken.value;
        }
        else if(currentToken.type === "conjunction"){
            currentConjunction = currentToken.value;
        }
        else if(currentToken.type === "value"){
            //Filter
            let filteredValues = FilterCollection(currentType, currentToken.value, currentOperation, leftSide);
            //JOIN IF CONJUNCTION IS WAITING
            leftSide = ApplyConjunction(currentConjunction, leftSide, filteredValues);
        }
        else if(currentToken.type === "keyword"){
            //SAVE TYPE
            currentType = currentToken.value;
        }

        text = text.substr(currentToken.endPos);
        currentToken = GetNextToken(text);
    }

    console.log('returning scopped results');
    return leftSide;
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

function FilterCollection(type:string, restOfString: string, operation: string, valuesEnteredWith: Array<CollectionFilterTypes>): Array<CollectionFilterTypes>{
    let value = restOfString.substr(operation.length);

    if(isListOfFish(valuesEnteredWith)){
        return FilterCollectionFish(type, value, operation, valuesEnteredWith);
    }
    else if(isListOfBug(valuesEnteredWith)){
        //Return filter collection bugs
    }
    return [];
}
