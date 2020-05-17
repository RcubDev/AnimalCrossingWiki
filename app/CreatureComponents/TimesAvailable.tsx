import { Thern } from "../../models/CollectionModelsV2/creatures";
import { View, Text } from "native-base";
import styles from './TimesAvailableStyle'
import React, { ReactNode } from "react";
export interface TimesAvailableProps {
    timesAvailable: Thern[]
}

function CreateTimeList(times: Thern[]): ReactNode[]{
    let timeArray: string[][] = [];
    let newTimes = times.flatMap(x => x.activeHours);
    newTimes.forEach(element => {
        let containsFirst = false;
        let containsSecond = false;
        timeArray.forEach(existingTime => {
            if(existingTime[0] === element[0]){
                containsFirst = true;
            }
            if(existingTime[1] === element[1]){
                containsSecond = true;
            }
        });

        if(!containsFirst && !containsSecond){
            timeArray.push(element);
        }
    });

    let timeJSXArray: ReactNode[] = [];
    for(let i = 0; i < timeArray.length; i++){
        if(+timeArray[i][0] === 0 && +timeArray[i][1] === 0){
            timeJSXArray.push(<Text key={`time${i}`}>{"All Day"}</Text>);
        }
        else{
            timeJSXArray.push(<Text key={`time${i}`}>{`${GetNormalTimeFromMilitaryTime(+timeArray[i][0])} - ${GetNormalTimeFromMilitaryTime(+timeArray[i][1])}`}</Text>);
        }
    }
    return timeJSXArray;
}

function GetNormalTimeFromMilitaryTime(time: number): string {
    let timeString = "";

    if(time < 12){
        timeString = `${time} AM`;
    }
    else {
        timeString = `${time - 12} PM`;
    }

    return timeString
}

export const TimesAvailable = (timesAvailable: TimesAvailableProps) => 
<View style={styles.timeContainer}>
    <Text>
        {"Clock Image Here"}
    </Text>
    {CreateTimeList(timesAvailable.timesAvailable)}
</View>