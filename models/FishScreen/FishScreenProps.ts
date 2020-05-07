import { NavigationScreenProp } from "react-navigation";
import { updateFishCaught, updateFishDonated, updateFishFilter, updateFishCollectionFromStorage, updateFishSort } from "../../app/Redux/CollectionActions";
import { ApplicationState } from "../ApplicationState/ApplicationState";
import { FishApplicationState } from '../FishApplicationState';
import { UserSettingsState } from '../ApplicationState/UserSettingsState';

export interface FishScreenProps {
    navigation: NavigationScreenProp<any>,
    fish: FishApplicationState,
    userSettings: UserSettingsState,
    updateFishCaught: typeof updateFishCaught,
    updateFishDonated: typeof updateFishDonated,
    updateFishFilter: typeof updateFishFilter,
    updateFishSort: typeof updateFishSort,
    updateFishCollectionFromStorage: typeof updateFishCollectionFromStorage
}