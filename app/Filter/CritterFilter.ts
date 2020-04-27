import { CritterModel } from "../../models/CollectionModels/CritterModel";
import { FilterCollectionMuseum } from "./MuseumFilter";

export function FilterCollectionCritter(type: string, value: string, operation: string, list: Array<CritterModel>): Array<CritterModel> {
    switch (type) {
        case "caught":
            return FilterCritterByCaught(operation, value, list);
        case "monthsAvailable":
        case "month":
        case "months":
            return FilterCritterByMonths(operation, value, list);
        case "rarity":
            return FilterCritterByRarity(operation, value, list);
        case "weather":
            return FilterCritterByWeather(operation, value, list);
        case "time":
            return [];
        default:
            let museumFilter = FilterCollectionMuseum(type, value, operation, list);
            return list.filter(x => museumFilter.map(y => y.id).includes(x.id));

    }
}

function FilterCritterByWeather(operation: string, value: string, list: Array<CritterModel>): Array<CritterModel> {
    switch(operation){
        case "=":
            return list.filter(x => x.weather.toLowerCase() === value.toLowerCase()); 
        case "!=":
            return list.filter(x => x.weather.toLowerCase() !== value.toLowerCase());
        default:
            return [];
    }
}

function FilterCritterByRarity(operation: string, value: string, list: Array<CritterModel>): Array<CritterModel>{
    let numVal = -1;
    if(isNaN(+value)){
        numVal = GetRarityNumberFromText(value);
    }
    else{
        numVal = +value;
    }

    switch(operation){
        case "=":
            return list.filter(x => x.rarity === numVal);
        case ">":
            return list.filter(x => x.rarity > numVal);
        case ">=":
            return list.filter(x => x.rarity >= numVal);
        case "<":
            return list.filter(x => x.rarity < numVal);
        case "<=":
            return list.filter(x => x.rarity <= numVal);
        case "!=":
            return list.filter(x => x.rarity !== numVal);
        default:
            return [];
    }
}

function GetRarityNumberFromText(value: string): number{
    switch(value.toLowerCase()){
        case "common":
            return 1;
        case "uncommon":
            return 2;
        case "rare":
            return 3;
        case "ultra rare":
            return 4
        default:
            return -1;
    }
}

function FilterCritterByCaught(operation: string, value: string, list: Array<CritterModel>): Array<CritterModel> {
    //Operation should be ":"
    //value = operation.substr(1);
    switch (value.toLowerCase()) {
        case "yes":
        case "true":
        case "caught":
            return list.filter(x => x.caught);
        case "no":
        case "false":
        case "not caught":
            return list.filter(x => !x.caught);
        default:
            return [];
    }
}

function FilterCritterByMonths(operation: string, value: string, list: Array<CritterModel>) {
    //Operation should be ":"
    //value = operation.substr(1);
    let values: Array<number> = [];
    let typeOfFilter = "";
    if (value.startsWith("[")) {
        //list split by commas
        value = value.substring(1, value.length - 1); //remove the []
        values = value.split(",").map(x => isNaN(+x) ? GetMonthValueFromText(x) : +x);
        //Remove value if we get a -1 or just throw err?
        values = values.filter(x => x !== -1);
    }
    else if (value.includes("-")) {
        //range split by dash
        values = value.split("-").map(x => isNaN(+x) ? GetMonthValueFromText(x) : +x);
        if (values.includes(-1)) {
            console.log("err")
            throw "Invalid text in month list";
        }
    }
    else {
        //single number or text value (hopefully)        
        if (isNaN(+value)) {
            values = [GetMonthValueFromText(value)];
        }
        else {
            values = [+value];
        }
    }

    return list.filter(x => CritterIsInValues(x, values));
}

function CritterIsInValues(critter: CritterModel, values: Array<number>): boolean {
    let isInValue = false;
    values.forEach(element => {
        if (!isInValue) {
            switch (element) {
                case 1:
                    isInValue = critter.monthsAvailable.jan;
                    break;
                case 2:
                    isInValue = critter.monthsAvailable.feb;
                    break;
                case 3:
                    isInValue = critter.monthsAvailable.mar;
                    break
                case 4:
                    isInValue = critter.monthsAvailable.apr;
                    break;
                case 5:
                    isInValue = critter.monthsAvailable.may;
                    break;
                case 6:
                    isInValue = critter.monthsAvailable.jun;
                    break;
                case 7:
                    isInValue = critter.monthsAvailable.jul;
                    break;
                case 8:
                    isInValue = critter.monthsAvailable.aug;
                    break;
                case 9:
                    isInValue = critter.monthsAvailable.sep;
                    break;
                case 10:
                    isInValue = critter.monthsAvailable.oct;
                    break;
                case 11:
                    isInValue = critter.monthsAvailable.nov;
                    break;
                case 12:
                    isInValue = critter.monthsAvailable.dec;
                    break;
            }

        }

    });
    return isInValue;
}

function GetMonthValueFromText(monthVal: string) {
    switch (monthVal.toLowerCase()) {
        case "jan":
        case "january":
            return 1;
        case "feb":
        case "february":
            return 2;
        case "march":
        case "mar":
            return 3
        case "apr":
        case "april":
            return 4;
        case "may":
            return 5;
        case "jun":
        case "june":
            return 6;
        case "jul":
        case "july":
            return 7;
        case "aug":
        case "august":
            return 8;
        case "sep":
        case "sept":
        case "september":
            return 9;
        case "oct":
        case "october":
            return 10;
        case "nov":
        case "november":
            return 11;
        case "dec":
        case "december":
            return 12;
        default:
            return -1;
    }
}