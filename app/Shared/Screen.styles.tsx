import { Platform, Dimensions, StyleSheet } from 'react-native';

var gridItemContainerStyle = {};
var gridItemCardStyle = {}

if (Platform.OS === 'web') {
    gridItemContainerStyle = { flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center', width: '5%', height: '5%', backgroundColor: '#f6f0e8' };
    gridItemCardStyle = { flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center', width: 150, height: 150, backgroundColor: '#f6f0e8' };
}
else {
    gridItemContainerStyle = { flex: 1, alignItems: 'center', alignContent: 'center', width: 200, height: 150, backgroundColor: '#f6f0e8' }
    gridItemCardStyle = { alignContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: '#f6f0e8' }
}

const { height, width } = Dimensions.get('window');
const itemWidth = (width - 20) / 3;

export const stylesData = {
    gridItem: {
        width: 50,
        height: 50
    },
    gridItemContainer: gridItemContainerStyle,
    gridItemCard: gridItemCardStyle,
    flatListContainerContent: { justifyContent: 'center' as 'center', alignItems: 'center' as 'center', alignContent: 'center'  as 'center', backgroundColor: '#9cf0c6' },
    screenContainer: { backgroundColor: '#f6f0e8' },
    card: { width: itemWidth },
    cardItem: { flexDirection: 'column' as 'column', backgroundColor: '#f6f0e8', borderColor: 'grey', borderRadius: 2 },
    cardCheckBoxContainer: { flexDirection: 'row' as 'row', width: '100%', alignItems: 'stretch' as 'stretch' },
    cardDonatedCheckBox: { position: 'absolute' as 'absolute', right: 0, marginRight: 10 },
    cardCaughtCheckBox: { marginLeft: -10 },
};

export default StyleSheet.create(stylesData);

