import { NavigationScreenProp } from "react-navigation";
import { updateItemCatalogged, updateKKSongCollectionFromStorage, updateFurnitureCollectionFromStorage } from "../../../app/ReduxV2/CollectionActions";
import { ApplicationStateV2 } from "../../ApplicationState/ApplicationStateV2";

export interface FurnitureScreenProps{
        navigation: NavigationScreenProp<any>,
        appState: ApplicationStateV2,
        route: {
                key: string,
                name: string,
                params: {
                        category: string,
                }
        }
        updateFurnitureCollectionFromStorage: typeof updateFurnitureCollectionFromStorage,
        updateItemCatalogged: typeof updateItemCatalogged
}