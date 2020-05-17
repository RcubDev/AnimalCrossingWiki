import { StyleSheet, Platform, Dimensions } from 'react-native';


const styles = StyleSheet.create({
    monthContainer: {
        width: '90%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#f4fdf4',
        alignItems: 'center',
        marginTop: 25,
        borderRadius: 20,
        borderColor: 'grey',
        borderWidth: 5,
        padding: 5
    },
    unselectedMonth: {
        width: '14%',
        borderColor: 'grey',
        borderWidth: 2,
        borderRadius: 5,
        padding: 4,
        alignItems: 'center',
        margin: 2
    },
    selectedMonth: {
        width: '14%',
        borderColor: 'grey',
        borderWidth: 4,
        borderRadius: 5,
        padding: 4,
        alignItems: 'center',
        margin: 2
    }
});

export default styles;
