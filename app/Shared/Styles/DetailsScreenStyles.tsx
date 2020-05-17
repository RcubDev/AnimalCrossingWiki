import { StyleSheet } from 'react-native';

const cardBackgroundColor = '#f4fdf4';
const fontFamily = 'Confortaa';
const peachBackground = '#ffecd9';
const greyedOutBackground = '#f0f0f0';
const scrollViewBackground = '#9cf0c6';
const imageAndNameBackground = '#cae9f6';
const containerBorderColor = 'grey';

export const detailsStylesData = {
    detailsScrollView: {
        flex: 1,
        backgroundColor: scrollViewBackground
    },
    detailsScrollViewContentContainer: {
        justifyContent: 'center' as 'center'
    },
    detailsContainer: {
        flex: 1,
        flexDirection: 'column' as 'column',
        alignItems: 'center' as 'center',
        paddingBottom: 200
    },
    detailsTitle: {
        width: '90%',
        padding: 20,
        justifyContent: 'center' as 'center' as 'center',
        backgroundColor: imageAndNameBackground,
        alignItems: 'center' as 'center',
        marginTop: 25,
        borderRadius: 20,
        borderColor: containerBorderColor,
        borderWidth: 5
    },
    detailsTitleImage: {},
    detailsTitleName: {
        backgroundColor: peachBackground,
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black' as 'black'
    },
    detailsTitleNameText: {
        fontFamily: fontFamily,
        fontSize: 26
    },
    detailsCheckBoxContainer: {
        flex: 1,
        flexDirection: 'row' as 'row',
        justifyContent: 'space-between' as 'space-between',
        width: '80%',
        marginTop: 25
    },
    detailsCheckBox: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginTop: 8
    },
    detailsValueContainer: {
        flexDirection: 'row' as 'row',
        backgroundColor: cardBackgroundColor,
        alignContent: 'center' as 'center',
        justifyContent: 'space-between' as 'space-between',
        alignItems: 'center' as 'center',
        width: '40%',
        borderColor: containerBorderColor,
        borderWidth: 5,
        borderRadius: 20,
        padding: 5
    },
    detailsBellImage: {
        width: 30,
        height: 30,
        marginLeft: 5
    },
    detailsValueAmount: {
        fontFamily: fontFamily,
        fontSize: 32,
        marginTop: 15
    },
    detailsMonthContainer: {
        width: '90%',
        flexWrap: 'wrap' as 'wrap',
        flexDirection: 'row' as 'row',
        justifyContent: 'center' as 'center' as 'center',
        backgroundColor: cardBackgroundColor,
        alignItems: 'center' as 'center',
        marginTop: 25,
        borderRadius: 20,
        borderColor: containerBorderColor,
        borderWidth: 5,
        padding: 5
    },
    detailsMonth: {
        width: '15%',
        minHeight: 30,
        backgroundColor: greyedOutBackground,
        borderRadius: 8,
        justifyContent: 'center' as 'center',
        alignItems: 'center' as 'center',
        margin: 2,
        borderWidth: 1,
        borderColor: containerBorderColor,
    },
    detailsMonthSelected: {
        backgroundColor: peachBackground,
    },
    detailsLocationAndTimeContainer: {
        width: '90%',
        padding: 10,
        marginTop: 25,
        flexDirection: 'row' as 'row',
        justifyContent: 'space-between' as 'space-between'
    },
    detailsImageAndTextContainer: {
        backgroundColor: cardBackgroundColor,
        width: '45%',
        justifyContent: 'space-evenly' as 'space-evenly',
        alignItems: 'center' as 'center',
        borderRadius: 20,
        height: 150,
        borderWidth: 5,
        borderColor: containerBorderColor
    },
    detailsText: {
        fontFamily: 'Confortaa'
    },
    detailsShadowSizeContainer: {
        width: '90%',
        padding: 10,
        justifyContent: 'center' as 'center',
        alignItems: 'center' as 'center'
    },
    detailsRarityContainer: {
        width: '90%',
        alignItems: 'center' as 'center'
    },
    detailsBlathersContainer: {
        width: '90%',
        justifyContent: 'center' as 'center',
        alignItems: 'center' as 'center',
        borderRadius: 20,
        borderColor: containerBorderColor,
        borderWidth: 5,
        backgroundColor: cardBackgroundColor,
        padding: 5,
        marginTop: 20
    },
    detailsBlathersText: {
        justifyContent: 'center' as 'center',
        alignItems: 'center' as 'center',
        fontFamily: fontFamily
    },
    detailsRarityTextContainer: {
        width: '100%',
        backgroundColor: cardBackgroundColor,
        alignItems: 'center' as 'center',
        flexDirection: 'row' as 'row',
        height: 50,
        borderColor: containerBorderColor,
        borderRadius: 20,
        borderWidth: 5,
        justifyContent: 'space-evenly' as 'space-evenly'
    }
};

export default StyleSheet.create(detailsStylesData);
