import { StyleSheet } from 'react-native';
import { stylesData } from '../Shared/Styles/Screen.styles'

const styles = StyleSheet.create({
    ...stylesData,
    cardCheckBoxContainer: { flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' },
    cardDonatedCheckBox: { marginRight: 20, marginTop: 20 },
    gridItem: {
        width: 100,
        height: 100,
        marginTop: 5
    }
});

export default styles;

