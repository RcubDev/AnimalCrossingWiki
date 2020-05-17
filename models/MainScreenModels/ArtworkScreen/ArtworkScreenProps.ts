import { NavigationScreenProp } from "react-navigation";
import { updateItemDonated, updateArtworkCollectionFromStorage } from "../../../app/ReduxV2/CollectionActions";
import { ApplicationStateV2 } from "../../ApplicationState/ApplicationStateV2";

export interface ArtworkScreenProps{
    navigation: NavigationScreenProp<any>,
    appState: ApplicationStateV2,
    updateArtworkCollectionFromStorage: typeof updateArtworkCollectionFromStorage,
    updateItemDonated: typeof updateItemDonated
}
