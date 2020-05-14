import { NavigationScreenProp } from "react-navigation";
import { updateCreatureCaught, updateCreatureDonated, updateBugCollectionFromStorage } from "../../../app/ReduxV2/CollectionActions";
import { ApplicationStateV2 } from "../../ApplicationState/ApplicationStateV2";

export interface BugScreenProps{
    navigation: NavigationScreenProp<any>,
    appState: ApplicationStateV2,
    updateCreatureCaught: typeof updateCreatureCaught,
    updateCreatureDonated: typeof updateCreatureDonated,
    updateBugCollectionFromStorage: typeof updateBugCollectionFromStorage
}