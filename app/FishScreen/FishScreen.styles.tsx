import { StyleSheet, Platform, Dimensions } from 'react-native';

var fishGridItemContainerStyle = {};
var fishGridItemCardStyle = {}

if(Platform.OS === 'web'){
    fishGridItemContainerStyle = {flex:1, flexDirection:'column', alignContent: 'center', alignItems: 'center', width:'5%', height: '5%', backgroundColor:'#f6f0e8'};
    fishGridItemCardStyle = {flex: 1, flexDirection:'column', alignContent: 'center', alignItems: 'center', width: 150, height: 150,  backgroundColor:'#f6f0e8'};
}
else{
    fishGridItemContainerStyle = {flex: 1,  alignItems: "center", alignContent: "center", width: 200, height: 150, backgroundColor:'#f6f0e8'}
    fishGridItemCardStyle = {alignContent: 'center', alignItems: 'center', flexDirection: "column", backgroundColor:'#f6f0e8'}
}

const {height, width} = Dimensions.get('window');
const itemWidth = (width - 20) / 3;

const styles = StyleSheet.create({    
    fishGridItem: {
        width: 50,
        height: 50        
    },
    fishGridItemContainer: fishGridItemContainerStyle,
    fishGridItemCard: fishGridItemCardStyle,
    flatListContainerContent: {justifyContent: "center",  alignItems: 'center', alignContent: 'center',backgroundColor: '#9cf0c6' },
    fishScreenContainer: {backgroundColor: "#f6f0e8"},
    card: {width:itemWidth},
    cardItem: {flexDirection: "column", backgroundColor:'#f6f0e8', borderColor: 'grey', borderRadius: 2},
    cardCheckBoxContainer: {flexDirection: "row", width:'100%', alignItems: 'stretch'},
    cardDonatedCheckBox: {position:"absolute", right:0, marginRight:10},
    cardCaughtCheckBox: {marginLeft: -10},
});

export default styles;
