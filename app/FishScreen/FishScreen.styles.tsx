import { StyleSheet, Platform } from 'react-native';

var fishGridItemContainerStyle = {};
var fishGridItemCardStyle = {}

if(Platform.OS === 'web'){
    fishGridItemContainerStyle = {flex:1, flexDirection:'column', alignContent: 'center', alignItems: 'center', width:'5%', height: '5%', backgroundColor:'#c2b280'};
    fishGridItemCardStyle = {flex: 1, flexDirection:'column', alignContent: 'center', alignItems: 'center', width: 150, height: 150,  backgroundColor:'#c2b280'};
}
else{
    fishGridItemContainerStyle = {flex: 1,  alignItems: "center", alignContent: "center", width: 200, height: 150, backgroundColor:'#c2b280'}
    fishGridItemCardStyle = {alignContent: 'center', alignItems: 'center', flexDirection: "column", backgroundColor:'#c2b280'}
}

const styles = StyleSheet.create({    
    fishGridItem: {
        width: 50,
        height: 50        
    },
    fishGridItemContainer: fishGridItemContainerStyle,
    fishGridItemCard: fishGridItemCardStyle,
    flatListContainerContent: {justifyContent: "center",  alignItems: 'center', alignContent: 'center' },
    fishScreenContainer: {backgroundColor: "#c2b280"},
    card: {width: "23%"},
    cardItem: {flexDirection: "column", backgroundColor:'#c2b280'},
    cardCheckBoxContainer: {flexDirection: "row", width:'100%', alignItems: 'stretch'},
    cardDonatedCheckBox: {position:"absolute", right:0, marginRight:10},
    cardCaughtCheckBox: {marginLeft: -10},
    flatListStyle: {flex: 1}
});

export default styles;
