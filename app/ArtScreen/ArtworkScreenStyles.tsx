import { StyleSheet, Dimensions } from 'react-native';
import { stylesData } from '../Shared/Styles/Screen.styles';

const { height, width } = Dimensions.get('window');
const itemWidth = (width - 20) / 2;

const styles = StyleSheet.create({
    ...stylesData,
    gridItem: {
        width: 150,
        height: 150,
        marginTop: 10
    },
    cardCheckBoxContainer: { flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' },
    cardDonatedCheckBox: { marginRight: 20, marginTop: 20 },
    card: { width: itemWidth },

});

export default styles;