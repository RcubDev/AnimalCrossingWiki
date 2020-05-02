import { NavigationScreenProp } from "react-navigation";
import { updateFishCaught, updateFishDonated, updateFishFilter } from "../../app/Redux/CollectionActions";
import { ApplicationState } from "../ApplicationState";

export interface FishScreenProps{
    navigation: NavigationScreenProp<any>,
    collections: ApplicationState,
    updateFishCaught: typeof updateFishCaught,
    updateFishDonated: typeof updateFishDonated,
    updateFishFilter: typeof updateFishFilter
}