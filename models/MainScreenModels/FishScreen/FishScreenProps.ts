import { NavigationScreenProp } from "react-navigation";
import { ApplicationState } from "../../ApplicationState/ApplicationState";
import { updateCreatureCaught, updateCreatureDonated, updateFishCollectionFromStorage } from "../../../app/ReduxV2/CollectionActions";
import { ApplicationStateV2 } from "../../ApplicationState/ApplicationStateV2";

export interface FishScreenProps{
    navigation: NavigationScreenProp<any>,
    appState: ApplicationStateV2,
    updateCreatureCaught: typeof updateCreatureCaught,
    updateCreatureDonated: typeof updateCreatureDonated,
    updateFishCollectionFromStorage: typeof updateFishCollectionFromStorage
}
