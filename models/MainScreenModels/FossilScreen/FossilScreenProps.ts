import { NavigationScreenProp } from "react-navigation";
import { ApplicationState } from "../../ApplicationState/ApplicationState";
import { updateFossilCollectionFromStorage, updateFossilDonated } from "../../../app/Redux/CollectionActions";

export interface FossilScreenProps{
    navigation: NavigationScreenProp<any>,
    appState: ApplicationState,
    updateFossilCollectionFromStorage: typeof updateFossilCollectionFromStorage,
    updateFossilDonated: typeof updateFossilDonated
}