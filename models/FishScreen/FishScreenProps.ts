import { NavigationScreenProp } from "react-navigation";
import { updateFishCaught, updateFishDonated } from "../../app/Redux/CollectionActions";
import { ApplicationState } from "../ApplicationState";

export interface FishScreenProps{
    navigation: NavigationScreenProp<any>,
    collections: ApplicationState,
    updateFishCaught: typeof updateFishCaught
    updateFishDonated: typeof updateFishDonated
}