import { NavigationScreenProp } from "react-navigation";
import { FishCardModel } from "./FishCardModel";
import { updateFishCaught } from "../../app/Redux/CollectionActions";
import { CollectionStateModel } from "../CollectionStateModel";

export interface FishScreenProps{
    navigation: NavigationScreenProp<any>,
    collections: CollectionStateModel
    updateFishCaught: typeof updateFishCaught
}