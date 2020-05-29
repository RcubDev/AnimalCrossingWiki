import { Platform, Dimensions, StyleSheet } from 'react-native';

const cardBackgroundColor = '#f4fdf4';
const fontFamily = 'Confortaa';
const peachBackground = '#ffecd9';
const greyedOutBackground = '#f0f0f0';
const scrollViewBackground = '#9cf0c6';
const imageAndNameBackground = '#cae9f6';
const containerBorderColor = 'grey';
const { width } = Dimensions.get('window');
const itemWidth = (width - 20) / 3;

export const stylesData = {
    // Screen
    flatListContainerContent: { justifyContent: 'center' as 'center', alignItems: 'center' as 'center', alignContent: 'center' as 'center', backgroundColor: '#9cf0c6' },
    // GridItem
    gridItem: {
        width: 50,
        height: 50
    },
    gridItemCard: Object.assign({ alignContent: 'center' as 'center', alignItems: 'center' as 'center', flexDirection: 'column' as 'column', backgroundColor: '#f6f0e8' }, Platform.OS === 'web' && { flex: 1, width: 150, height: 150 }),
    card: { width: itemWidth },
    cardItem: { flexDirection: 'column' as 'column', backgroundColor: '#f6f0e8', borderColor: 'grey', borderRadius: 2 },
    cardCheckBoxContainer: { flexDirection: 'row' as 'row', width: '100%', alignItems: 'stretch' as 'stretch' },
    cardDonatedCheckBox: { position: 'absolute' as 'absolute', right: 0, marginRight: 10 },
    cardCaughtCheckBox: { marginLeft: -10 },
    // DetailsScreen
    monthItem: {
        width: '15%',
        backgroundColor: greyedOutBackground,
        borderRadius: 8,
        justifyContent: 'center' as 'center',
        alignItems: 'center' as 'center',
        margin: 2,
        borderWidth: 1,
        borderColor: containerBorderColor,
        fontFamily: fontFamily,
        minHeight: 30

    },
    monthItemSelected: {
        width: '15%',
        minHeight: 30,
        backgroundColor: peachBackground,
        borderRadius: 8,
        justifyContent: 'center' as 'center',
        alignItems: 'center' as 'center',
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
        flexDirection: 'column' as 'column',
        alignItems: 'center' as 'center',
        paddingBottom: 200
    },
    imageAndNameContainer: {
        width: '90%',
        padding: 20,
        justifyContent: 'center' as 'center',
        backgroundColor: imageAndNameBackground,
        alignItems: 'center' as 'center',
        marginTop: 25,
        borderRadius: 20,
        borderColor: containerBorderColor,
        borderWidth: 5
    },
    nameViewStyling: {
        backgroundColor: peachBackground,
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black'
    },
    nameTextStyling: {
        fontFamily: fontFamily,
        fontSize: 26
    },
    caughtDonatedValueContainer: {
        flex: 1,
        flexDirection: 'row' as 'row',
        justifyContent: 'space-between' as 'space-between',
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
        flexDirection: 'row' as 'row',
        alignItems: 'center' as 'center',
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
        flexWrap: 'wrap' as 'wrap',
        flexDirection: 'row' as 'row',
        justifyContent: 'center' as 'center',
        backgroundColor: cardBackgroundColor,
        alignItems: 'center' as 'center',
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
        flexDirection: 'row' as 'row',
        justifyContent: 'space-between' as 'space-between'
    },
    imageAndTextContainer: {
        backgroundColor: cardBackgroundColor,
        width: '45%',
        justifyContent: 'space-evenly' as 'space-evenly',
        alignItems: 'center' as 'center',
        borderRadius: 20,
        height: 150,
        borderWidth: 5,
        borderColor: containerBorderColor
    },
    shadowSizeContainer: {
        width: '90%',
        padding: 10,
        justifyContent: 'center' as 'center',
        alignItems: 'center' as 'center'
    },
    rarityContainer: {
        width: '90%',
        alignItems: 'center' as 'center'
    },
    blathersSaysContinaer: {
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
    blathersSaysText: {
        justifyContent: 'center' as 'center',
        alignItems: 'center' as 'center',
        fontFamily: fontFamily
    },
    stylesRarityTextContainer: {
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

export default StyleSheet.create(stylesData);

