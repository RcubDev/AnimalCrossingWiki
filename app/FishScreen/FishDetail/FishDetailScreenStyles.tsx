import { StyleSheet, Platform, Dimensions } from 'react-native';

const cardBackgroundColor = "#f4fdf4";
const fontFamily = "Confortaa";
const peachBackground = "#ffecd9";
const greyedOutBackground = "#f0f0f0";
const scrollViewBackground = "#9cf0c6";
const imageAndNameBackground = "#cae9f6";
const containerBorderColor = 'grey';
const styles = StyleSheet.create({
    monthItem: {
        width: '15%',
        backgroundColor: greyedOutBackground, //#f0f0f0
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        borderWidth: 1,
        borderColor: containerBorderColor,
        fontFamily: fontFamily,
        minHeight: 30

    },
    monthItemSelected: {
        width: '15%',
        minHeight: 30,
        backgroundColor: peachBackground, //#f0f0f0
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        borderWidth: 1,
        borderColor: containerBorderColor,
        fontFamily: fontFamily
    },
    detailViewScrollView: {
        flex: 1,
        backgroundColor: scrollViewBackground
    },
    detailViewContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 200
    },
    imageAndNameContainer: {
        width: '90%',
        padding: 20,
        justifyContent: 'center',
        backgroundColor: imageAndNameBackground,
        alignItems: 'center',
        marginTop: 25,
        borderRadius: 20,
        borderColor: containerBorderColor,
        borderWidth: 5
    },
    fishNameViewStyling: {
        backgroundColor: peachBackground,
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black'
    },
    fishNameTextStyling: {
        fontFamily: fontFamily,
        fontSize: 26
    },
    caughtDonatedValueContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 25
    },
    checkBoxTemp: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginTop: 8
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: cardBackgroundColor,
        width: '40%',
        borderColor: containerBorderColor,
        borderWidth: 5,
        borderRadius: 20,
        padding: 5
    },
    valueText: {
        fontFamily: fontFamily,
        fontSize: 25,        
    },
    monthContainer: {
        width: '90%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: cardBackgroundColor,
        alignItems: 'center',
        marginTop: 25,
        borderRadius: 20,
        borderColor: containerBorderColor,
        borderWidth: 5,
        padding: 5
    },
    locationAndTimeContainer: {
        width: '90%',
        padding: 10,
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageAndTextContainer: {
        backgroundColor: cardBackgroundColor,
        width: '45%',
        justifyContent: "space-evenly",
        alignItems: 'center',
        borderRadius: 20,
        height: 150,
        borderWidth: 5,
        borderColor: containerBorderColor
    },
    shadowSizeContainer: {
        width: '90%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rarityContainer: {
        width: '90%',
        alignItems: 'center'
    },
    blathersSaysContinaer: {
        width: '90%',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 20,
        borderColor: containerBorderColor,
        borderWidth: 5,
        backgroundColor: cardBackgroundColor,
        padding: 5,
        marginTop: 20
    },
    blathersSaysText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: fontFamily
    },
    stylesRarityTextContainer: {
        width: '100%',
        backgroundColor: cardBackgroundColor,
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
        borderColor: containerBorderColor,
        borderRadius: 20,
        borderWidth: 5,
        justifyContent: 'space-evenly'
    }
});

export default styles;