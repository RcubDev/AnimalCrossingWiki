import { StyleSheet, Platform, Dimensions } from 'react-native';

let gridItemCardStyle = {}

if (Platform.OS === 'web') {
    gridItemCardStyle = { flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center', width: 150, height: 150, backgroundColor: '#f6f0e8' };
}
else {
    gridItemCardStyle = { alignContent: 'center', alignItems: 'center', flexDirection: "column", backgroundColor: '#f6f0e8' }
}

const { width } = Dimensions.get('window');
const itemWidth = (width - 20) / 3;

const styles = StyleSheet.create({
    gridItem: {
        width: 50,
        height: 50
    },
    gridItemCard: gridItemCardStyle,
    card: { width: itemWidth },
    cardItem: { flexDirection: "column", backgroundColor: '#f6f0e8', borderColor: 'grey', borderRadius: 2 },
    cardCheckBoxContainer: { flexDirection: "row", width: '100%', alignItems: 'stretch' },
    cardDonatedCheckBox: { position: "absolute", right: 0, marginRight: 10 },
    cardCaughtCheckBox: { marginLeft: -10 },
});

export default styles;
