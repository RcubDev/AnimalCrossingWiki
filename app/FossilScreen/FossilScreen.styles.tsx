import { StyleSheet, Platform, Dimensions } from 'react-native';

var fossilGridItemContainerStyle = {};
var fossilGridItemCardStyle = {}

if (Platform.OS === 'web') {
    fossilGridItemContainerStyle = { flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center', width: '5%', height: '5%', backgroundColor: '#f6f0e8' };
    fossilGridItemCardStyle = { flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center', width: 150, height: 150, backgroundColor: '#f6f0e8' };
}
else {
    fossilGridItemContainerStyle = { flex: 1, alignItems: "center", alignContent: "center", width: 200, height: 150, backgroundColor: '#f6f0e8' }
    fossilGridItemCardStyle = { alignContent: 'center', alignItems: 'center', flexDirection: "column", backgroundColor: '#f6f0e8' }
}

const { height, width } = Dimensions.get('window');
const itemWidth = (width - 20) / 3;

const styles = StyleSheet.create({
    fossilGridItem: {
        width: 50,
        height: 50
    },
    fossilGridItemContainer: fossilGridItemContainerStyle,
    fossilGridItemCard: fossilGridItemCardStyle,
    card: { width: itemWidth },
    cardItem: { flexDirection: "column", backgroundColor: '#f6f0e8', borderColor: 'grey', borderRadius: 2 },
    cardCheckBoxContainer: { flexDirection: "row", width: '100%', alignItems: 'center', justifyContent: 'center' },
    cardDonatedCheckBox: {},
    flatListContainerContent: { justifyContent: "center", alignItems: 'center', alignContent: 'center', backgroundColor: '#9cf0c6' },
});

export default styles;

