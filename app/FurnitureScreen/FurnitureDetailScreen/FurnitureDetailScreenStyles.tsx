import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    textContainer: {
        minWidth: '45%',
        alignItems: 'center',
        marginTop: 10,
        borderColor: 'grey',
        borderWidth: 2,
        borderRadius: 10,
        padding: 5,
        margin: '1%'
    },
    textContainerFull: {
        width: '80%',
        alignItems: 'center',
        marginTop: 10,
        borderColor: 'grey',
        borderWidth: 2,
        borderRadius: 10,
        padding: 5,
        margin: '1%'
    },
    textContainerNew: {
        minWidth: '90%',
        flexDirection: 'row',
        marginTop: 5
    },
    textValue: {
        minWidth: '60%',
        padding: 5,
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 2,
        justifyContent: 'center'
    },
    textDesc: {
        minWidth: '30%',
        maxWidth: '35%',
        padding: 5,
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 2,
        marginRight: 4,        
        alignItems: 'center'
    }
});

export default styles;