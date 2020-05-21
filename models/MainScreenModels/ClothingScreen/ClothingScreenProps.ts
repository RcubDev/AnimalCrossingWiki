import { NavigationScreenProp } from "react-navigation";
import { updateItemCatalogged, updateClothingCollectionFromStorage } from "../../../app/ReduxV2/CollectionActions";
import { ApplicationStateV2 } from "../../ApplicationState/ApplicationStateV2";

export interface ClothingScreenProps{
        navigation: NavigationScreenProp<any>,
        appState: ApplicationStateV2,
        params: {
                category: string,
        }
        updateClothingCollectionFromStorage: typeof updateClothingCollectionFromStorage,
        updateItemCatalogged: typeof updateItemCatalogged
}