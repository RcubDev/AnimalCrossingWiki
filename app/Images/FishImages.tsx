import { ImageSourcePropType } from "react-native";

export interface IDictionary {
    [name: string]: ImageSourcePropType;
}

const FishImages: IDictionary = {};
FishImages["Anchovy"] = require('./Fish/Anchovy.png');
FishImages["Bitterling"] = require('./Fish/Bitterling.png');
FishImages["Barred Knifejaw"] = require('./Fish/BarredKnifejaw.png');      
export default FishImages;