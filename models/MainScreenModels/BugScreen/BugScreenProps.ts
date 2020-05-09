import { NavigationScreenProp } from "react-navigation";
import { ApplicationState } from "../../ApplicationState/ApplicationState";
import { updateBugCollectionFromStorage, updateBugSort, updateBugFilter, updateBugDonated, updateBugCaught } from "../../../app/Redux/CollectionActions";

export interface BugScreenProps{
    navigation: NavigationScreenProp<any>,
    appState: ApplicationState,
    updateBugCaught: typeof updateBugCaught,
    updateBugDonated: typeof updateBugDonated,
    updateBugFilter: typeof updateBugFilter,
    updateBugSort: typeof updateBugSort,
    updateBugCollectionFromStorage: typeof updateBugCollectionFromStorage
}