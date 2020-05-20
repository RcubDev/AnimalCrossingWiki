import { StyleSheet } from 'react-native';
import { processFontFamily } from 'expo-font';
const fontFamily = "AnimalCrossing";


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fffffc',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center'
    },
    textStyle: {
        color: 'black',
        fontSize: 20,
        alignContent: 'center',
        flexWrap: 'wrap',
        margin: 10,
        fontFamily: 'Confortaa'
    },
    buttonStyle: {
        height: 140,
        width: 160,
        margin: 10,
        justifyContent: 'center',
        borderRadius: 20,
        flexWrap: 'wrap',
        alignContent: 'center',
        borderWidth: 1,
        borderColor: 'black'

    },
});

export default styles;