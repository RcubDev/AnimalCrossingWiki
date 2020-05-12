import { StyleSheet, Platform, Dimensions } from 'react-native';

var artworkGridItemContainerStyle = {};
var artworkGridItemCardStyle = {}

if (Platform.OS === 'web') {
    artworkGridItemContainerStyle = { flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center', width: '5%', height: '5%', backgroundColor: '#f6f0e8' };
    artworkGridItemCardStyle = { flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center', width: 150, height: 150, backgroundColor: '#f6f0e8' };
}
else {
    artworkGridItemContainerStyle = { flex: 1, alignItems: "center", alignContent: "center", width: 200, height: 150, backgroundColor: '#f6f0e8' }
    artworkGridItemCardStyle = { alignContent: 'center', alignItems: 'center', flexDirection: "column", backgroundColor: '#f6f0e8' }
}

const { height, width } = Dimensions.get('window');
const itemWidth = (width - 20) / 2;

const styles = StyleSheet.create({
    artworkGridItem: {
        width: 120,
        height: 120,
        marginTop: 10
    },
    artworkGridItemContainer: artworkGridItemContainerStyle,
    artworkGridItemCard: artworkGridItemCardStyle,
    card: { width: itemWidth },
    cardItem: { flexDirection: "column", backgroundColor: '#f6f0e8', borderColor: 'grey', borderRadius: 2 },
    cardCheckBoxContainer: { flexDirection: "row", width: '100%', alignItems: 'center', justifyContent: 'center' },
    cardDonatedCheckBox: {},
    flatListContainerContent: { justifyContent: "center", alignItems: 'center', alignContent: 'center', backgroundColor: '#9cf0c6' },

});

export default styles;