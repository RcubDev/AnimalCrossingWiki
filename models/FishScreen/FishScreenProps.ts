import { NavigationScreenProp } from "react-navigation";
import { FishCardModel } from "./FishCardModel";
import { updateFishCaught, updateFishDonated } from "../../app/Redux/CollectionActions";
import { CollectionStateModel } from "../CollectionStateModel";

export interface FishScreenProps{
    navigation: NavigationScreenProp<any>,
    collections: CollectionStateModel
    updateFishCaught: typeof updateFishCaught
    updateFishDonated: typeof updateFishDonated
}