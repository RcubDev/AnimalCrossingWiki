import { View, Text } from "native-base";
import styles from './MonthsAvailableStyle'
import { Thern } from "../../models/CollectionModelsV2/creatures";
import React, { ReactNode } from "react";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function CreateMonths(monthsAvailable: Thern[]): ReactNode[]{    
    let monthComponentArray = [];
    for(let i = 0; i < months.length; i++){
        monthComponentArray.push(
            <View key={"month" + i} style={monthsAvailable.find(x => x.month === i + 1) ? styles.selectedMonth : styles.unselectedMonth }>
                <Text style={{justifyContent: "center", alignItems: 'center', alignContent: 'center'}}>{months[i]}</Text>
            </View>
        );
    }
    return monthComponentArray;
}

export interface MonthsAvailableProps {
    monthsAvailable: Thern[]
}

export const MonthsAvailable = (monthsAvailable: MonthsAvailableProps) => 
<View style={styles.monthContainer}>
    {CreateMonths(monthsAvailable.monthsAvailable)}
</View>