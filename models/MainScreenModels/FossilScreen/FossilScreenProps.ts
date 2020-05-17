import { NavigationScreenProp } from "react-navigation";
import { updateItemDonated, updateFossilCollectionFromStorage } from "../../../app/ReduxV2/CollectionActions";
import { ApplicationStateV2 } from "../../ApplicationState/ApplicationStateV2";

export interface FossilScreenProps{
        navigation: NavigationScreenProp<any>,
        appState: ApplicationStateV2,
        updateFossilCollectionFromStorage: typeof updateFossilCollectionFromStorage,
        updateItemDonated: typeof updateItemDonated
}