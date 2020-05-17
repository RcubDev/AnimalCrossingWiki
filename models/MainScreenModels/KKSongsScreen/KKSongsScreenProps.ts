import { NavigationScreenProp } from "react-navigation";
import { updateItemCatalogged, updateKKSongCollectionFromStorage } from "../../../app/ReduxV2/CollectionActions";
import { ApplicationStateV2 } from "../../ApplicationState/ApplicationStateV2";

export interface KKSongScreenProps{
        navigation: NavigationScreenProp<any>,
        appState: ApplicationStateV2,
        updateKKSongCollectionFromStorage: typeof updateKKSongCollectionFromStorage,
        updateItemCatalogged: typeof updateItemCatalogged
}