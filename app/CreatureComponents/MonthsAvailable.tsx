import { View, Text } from "native-base";
import styles from './MonthsAvailableStyle'
import { Thern } from "../../models/CollectionModelsV2/creatures";
import React, { ReactNode } from "react";

export function Test(): ReactNode[]{
    let test = [];
    for(let i = 1; i < 13; i++){
        test.push(
            <View style={{width: '5%', borderColor: 'grey', borderWidth: 2, borderRadius: 2}}>
                <Text>{i}</Text>
            </View>
        );
    }
    return test;
}

export const MonthsAvailable = (monthsAvailable: Thern[]) => 
<View style={styles.monthContainer}>
    {Test()}
</View>