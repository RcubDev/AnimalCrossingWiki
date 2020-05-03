import { StyleSheet, Platform, Dimensions } from 'react-native';

const styles = StyleSheet.create({    
    monthItem: {
        width: '15%',
        backgroundColor:'#f0f0f0', //#f0f0f0
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        borderWidth: 1,
        borderColor:'grey',
        fontFamily: 'Confortaa',
        minHeight: 30

    },
    monthItemSelected: {
        width: '15%',
        minHeight: 30,
        backgroundColor:'#ffecd9', //#f0f0f0
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        borderWidth: 1,
        borderColor:'grey',
        fontFamily: 'Confortaa'
    }
});

export default styles;