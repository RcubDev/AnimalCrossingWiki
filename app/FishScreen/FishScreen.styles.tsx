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
        // minWidth: 50,
        // minHeight: 50,
        // maxWidth: 100,
        // maxHeight: 50
        width: 100,
        height: 50        
    },
    fishGridItemContainer: fishGridItemContainerStyle,
    fishGridItemCard: fishGridItemCardStyle
});

export default styles;
