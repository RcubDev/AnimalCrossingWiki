import { StyleSheet } from 'react-native';
import { stylesData} from '../Shared/Screen.styles';

const styles = StyleSheet.create({ ...stylesData,
    cardCheckBoxContainer: { flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' },
    cardDonatedCheckBox: {marginRight: 20, marginTop: 20},
});

export default styles;

