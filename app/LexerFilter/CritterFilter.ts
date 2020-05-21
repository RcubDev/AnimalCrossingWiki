import { CritterModel } from "../../models/CollectionModels/CritterModel";
import { FilterCollectionMuseum } from "./MuseumFilter";
import moment from "moment";

export function FilterCollectionCritter(type: string, value: string, operation: string, list: Array<CritterModel>, timeOffSet: number | null = null): Array<CritterModel> {    
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
            return FilterCritterByTime(operation, value, list, timeOffSet);
        default:
            let museumFilter = FilterCollectionMuseum(type, value, operation, list);
            return list.filter(x => museumFilter.map(y => y.id).includes(x.id));

    }
}

function FilterCritterByTime(operation: string, value: string, list:Array<CritterModel>, timeOffSet: number | null): Array<CritterModel>{
    switch(operation){
        case "=":
        case ":":
            return FilterCritterByTimeEquals(value, list, timeOffSet);
        default:
            return [];
    }
}

//Only allows for miltary time
function FilterCritterByTimeEquals(value: string, list:Array<CritterModel>, timeOffSet: number | null){
    let values: Array<number> = [];
    if(value.toLowerCase() === "now"){
        if(timeOffSet === null){
            throw "Current hour cannot be null";
        }
        else{
            let date = moment(new Date()).add(timeOffSet, 'minutes').toDate();
            list = FilterCritterByMonths("=", `${date.getMonth() + 1}`, list);           
            values.push(date.getHours());
        }
    }
    else {
        if(value.startsWith('[')){
            value = value.substring(1, value.length - 1); //remove the []
            values = value.split(",").map(x => isNaN(+x) ? GetMonthValueFromText(x) : +x);
            //Remove value if we get a -1 or just throw err?
            values = values.filter(x => x !== -1);
        }
        else if(value.includes('-')){
            values = value.split("-").map(x => +x);
            let rangeValues = value.split("-").map(x => isNaN(+x) ? GetMonthValueFromText(x) : +x);
            //0 = 12AM
            //24 = NOTHING
            let endVal = rangeValues[0] >= rangeValues[1] ? rangeValues[0] : rangeValues[1];
            let startVal = rangeValues[0] >= rangeValues[1] ? rangeValues[1] : rangeValues[0];
            if((startVal > 23 || startVal < 1) || (endVal < 1 || endVal > 23)){
                throw "Invalid range input";
            }
            while(startVal !== endVal){
                values.push(startVal);
                if(startVal === 23){
                    startVal = 0;
                }
                startVal++;
            }
        }
        else{
            //should be a single value
            values = [+value];
        }
    }
    return list.filter(x => CritterIsAvailableDuringTime(values, x));
}


function CritterIsAvailableDuringTime(hoursToCheck: Array<number>, critter: CritterModel){    
    let isInside: boolean = false;
    hoursToCheck.forEach(element => {
        if(CritterIsAvailableDuringHour(element, critter)){
            isInside = true;
        }
    });
    return isInside;
}

function CritterIsAvailableDuringHour(hour: number, critter: CritterModel): boolean {
    for(let i = 0; i < critter.catchStartTime.length; i++){
        let possibleHours = [];        
        let endVal = critter.catchEndTime[i];
        let startVal = critter.catchStartTime[i];
        while(startVal !== endVal){
            possibleHours.push(startVal);
            if(startVal === 24){
                startVal = 0;
            }
            startVal++;
        }
        if(possibleHours.includes(hour)){
            return true;
        }
    }
    return false;
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
        let rangeValues = value.split("-").map(x => isNaN(+x) ? GetMonthValueFromText(x) : +x);
        if (rangeValues.includes(-1)) {
            throw "Invalid text in month list";
        }
        let endVal = rangeValues[0] >= rangeValues[1] ? rangeValues[0] : rangeValues[1];
        let startVal = rangeValues[0] >= rangeValues[1] ? rangeValues[1] : rangeValues[0];
        if((startVal > 12 || startVal < 1) || (endVal < 1 || endVal > 12)){
            throw "Invalid range input";
        }
        while(startVal !== endVal){
            values.push(startVal);
            if(startVal === 12){
                startVal = 1;
            }
            startVal++;
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