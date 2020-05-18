import { NavigationScreenProp } from "react-navigation";
import { updateItemCatalogged, updateReactionCollectionFromStorage, updateModelObtained } from "../../../app/ReduxV2/CollectionActions";
import { ApplicationStateV2 } from "../../ApplicationState/ApplicationStateV2";

export interface ReactionsScreenProps{
        navigation: NavigationScreenProp<any>,
        appState: ApplicationStateV2,
        updateReactionCollectionFromStorage: typeof updateReactionCollectionFromStorage,
        updateModelObtained: typeof updateModelObtained
}