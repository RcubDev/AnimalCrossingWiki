import { StyleSheet } from 'react-native';
import { screenStylesData } from '../Shared/Styles/Screen.styles';

const styles = StyleSheet.create({
    ...screenStylesData,
    cardCheckBoxContainer: { flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' },
    cardDonatedCheckBox: {},
});

export default styles;

