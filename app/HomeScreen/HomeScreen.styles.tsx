import { StyleSheet } from 'react-native';
import { processFontFamily } from 'expo-font';
const fontFamily = "AnimalCrossing";


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',        
        flexDirection: "row",
        alignContent: 'flex-end',
        flexWrap: 'wrap',
        width: 'auto',
        height: 'auto'
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
        flexDirection: 'row',
        height: 140,
        width: 140,
        margin: 20,
        justifyContent: 'center',
        borderRadius: 20,
        flexWrap: 'wrap',
        borderWidth: 1,
        borderColor: 'black',

    },
});

export default styles;