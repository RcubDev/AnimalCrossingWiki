import { View, Text } from 'native-base';
import styles from './MonthsAvailableStyle'
import { Thern } from '../../models/CollectionModelsV2/creatures';
import React from 'react';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const MonthsAvailable = (props: MonthsAvailableProps) =>
    <View style={styles.monthContainer}>
        {months.map((month, i) => <View key={'month' + i} style={props.monthsAvailable.find(x => x.month === i + 1) ? styles.selectedMonth : styles.unselectedMonth}>
            <Text style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>{month}</Text>
        </View>)}
    </View>

export interface MonthsAvailableProps {
    monthsAvailable: Thern[]
}