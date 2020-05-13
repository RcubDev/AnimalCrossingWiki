import { StyleSheet } from 'react-native';
import { stylesData} from '../Shared/Screen.styles';

const styles = StyleSheet.create({...stylesData,
    gridItem: {
        width: 120,
        height: 120,
        marginTop: 10
    },
    cardCheckBoxContainer: { flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' },
    cardDonatedCheckBox: {},
});

export default styles;