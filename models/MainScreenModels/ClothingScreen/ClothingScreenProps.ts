import { NavigationScreenProp } from "react-navigation";
import { updateItemCatalogged, updateClothingCollectionFromStorage } from "../../../app/ReduxV2/CollectionActions";
import { ApplicationStateV2 } from "../../ApplicationState/ApplicationStateV2";

export interface ClothingScreenProps{
        navigation: NavigationScreenProp<any>,
        appState: ApplicationStateV2,
        route: {
                key: string,
                name: string,
                params: {
                        category: string,
                        labelTheme: string
                }
        }
        updateClothingCollectionFromStorage: typeof updateClothingCollectionFromStorage,
        updateItemCatalogged: typeof updateItemCatalogged
}