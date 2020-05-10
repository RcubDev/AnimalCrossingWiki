import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',        
        flexDirection: "row",
        alignContent: 'space-between',
        
        
    },
    buttonStyle: {
        height: 50,
        width: 50,
        margin: 20
    },

    fishButtonStyle:{
        height: 50,
        width: 50,
        margin: 20,
       backgroundColor: '#87CEEB',
       justifyContent: "center",
    },


    bugButtonStyle:{
        height: 50,
        width: 50,
        margin: 20,
       backgroundColor: '#56b000',
       justifyContent: "center",
    },

    settingsButtonStyle:{
        height: 50,
        width: 50,
        margin: 20,
       backgroundColor: 'grey',
       justifyContent: "center",
    },

    fossilsButtonStyle:{
        height: 50,
        width: 50,
        margin: 20,
       backgroundColor: 'brown',
       justifyContent: "center",
    },

    
    artworkButtonStyle:{
        height: 50,
        width: 50,
        margin: 20,
       backgroundColor: 'purple',
       justifyContent: "center",
    },


    fishButtonTextStyle: {
        color: 'white'
    }
});

export default styles;