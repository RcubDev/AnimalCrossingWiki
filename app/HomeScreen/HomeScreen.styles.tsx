import { StyleSheet } from 'react-native';
import { processFontFamily } from 'expo-font';
const fontFamily = "AnimalCrossing";


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        flex: 1,
        resizeMode: 'cover',
        height: 800
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
        margin: 20,
        justifyContent: 'center',
        borderRadius: 20,
        flexWrap: 'wrap',
        alignContent: 'center',
        borderWidth: 1,
        borderColor: 'black'

    },
});

export default styles;