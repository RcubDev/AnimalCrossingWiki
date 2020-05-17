import { Platform, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const itemWidth = (width - 20) / 3;

export const gridItemStylesData = {
    gridItemContainer: { width: itemWidth },
    gridItemContainerItem: { flexDirection: 'column' as 'column', backgroundColor: '#f6f0e8', borderColor: 'grey', borderRadius: 2 },
    gridItemContent: Object.assign({
        alignContent: 'center' as 'center', alignItems: 'center' as 'center', flexDirection: 'column' as 'column', backgroundColor: '#f6f0e8'
    },
        Platform.OS === 'web' && { flex: 1, width: 150, height: 150, backgroundColor: '#f6f0e8' },
    ),
    gridItemText: { fontFamily: 'Confortaa' },
    gridItemImage: { height: 50, width: 50 },
    gridItemCheckBoxContainer: { flexDirection: 'row' as 'row', width: '100%', alignItems: 'stretch' as 'stretch' },
    gridItemDonatedCheckBox: { position: 'absolute' as 'absolute', right: 0, marginRight: 10 },
    gridItemCaughtCheckBox: { marginLeft: -10 },
};

export default StyleSheet.create(gridItemStylesData);

