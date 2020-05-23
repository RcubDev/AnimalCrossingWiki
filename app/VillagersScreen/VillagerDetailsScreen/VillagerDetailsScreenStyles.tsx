import { StyleSheet, Platform, Dimensions } from 'react-native';

const cardBackgroundColor = "#f4fdf4";
const fontFamily = "Confortaa";
const peachBackground = "#ffecd9";
const greyedOutBackground = "#f0f0f0";
const scrollViewBackground = "#9cf0c6";
const imageAndNameBackground = "#cae9f6";
const containerBorderColor = 'grey';
const styles = StyleSheet.create({
    textStyle: {
        fontSize: 16,
        fontFamily: fontFamily,
        margin: 20,
        textAlign: 'center'
    },
    textStyleName: {
        fontSize: 30,
        fontFamily: fontFamily
    },
    personalitySpeciesText: {
        fontSize: 16,
        fontFamily: fontFamily,
        margin: 20,
        padding: 5,
        borderWidth: 2,
        borderColor: containerBorderColor,
        borderRadius: 10,
    },
    calendarText: {        
        fontSize: 30,
        paddingLeft: '3%'        
    }
});

export default styles;