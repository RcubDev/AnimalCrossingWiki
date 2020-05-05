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

export function filterCollectionByTextSpecial(text: string, collection: Array<CollectionFilterTypes>, timeOffSet: number): Array<CollectionFilterTypes> {
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
            let filteredValues = FilterCollection(currentType, currentToken.value, currentOperation, collection, timeOffSet);
            //JOIN IF CONJUNCTION IS WAITING
            leftSide = ApplyConjunction(currentConjunction, leftSide, filteredValues);
            if(currentConjunction !== ""){
                currentConjunction = "";
            }

            currentOperation = "";
            currentType = "";            
        }
        else if(currentToken.type === "keyword"){
            //SAVE TYPE
            currentType = currentToken.value;
        }

        text = text.substr(currentToken.endPos);
        currentToken = GetNextToken(text);
    }

    return leftSide;
}

function ApplyConjunction(conjunction: string, leftSide: Array<CollectionFilterTypes>, rightSide: Array<CollectionFilterTypes>) {
    if(conjunction && conjunction === "|"){

        return _.union(leftSide, rightSide);
    }
    else if(conjunction && conjunction === "&"){
        return leftSide.filter(x => rightSide.indexOf(x) > -1);
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

function FilterCollection(type:string, value: string, operation: string, valuesEnteredWith: Array<CollectionFilterTypes>, timeOffSet: number): Array<CollectionFilterTypes>{

    if(isListOfFish(valuesEnteredWith)){
        return FilterCollectionFish(type, value, operation, valuesEnteredWith, timeOffSet);
    }
    else if(isListOfBug(valuesEnteredWith)){
        //Return filter collection bugs
    }
    return [];
}
