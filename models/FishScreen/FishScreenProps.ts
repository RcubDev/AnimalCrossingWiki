import { NavigationScreenProp } from "react-navigation";
import { updateFishCaught, updateFishDonated, updateFishFilter, updateFishCollectionFromStorage } from "../../app/Redux/CollectionActions";
import { ApplicationState } from "../ApplicationState/ApplicationState";

export interface FishScreenProps{
    navigation: NavigationScreenProp<any>,
    appState: ApplicationState,
    updateFishCaught: typeof updateFishCaught,
    updateFishDonated: typeof updateFishDonated,
    updateFishFilter: typeof updateFishFilter,
    updateFishCollectionFromStorage: typeof updateFishCollectionFromStorage
}