import { NavigationScreenProp } from "react-navigation";
import { ApplicationState } from "../../ApplicationState/ApplicationState";
import { updateArtworkCollectionFromStorage, updateArtworkDonated } from "../../../app/Redux/CollectionActions";

export interface ArtworkScreenProps{
    navigation: NavigationScreenProp<any>,
    appState: ApplicationState,
    updateArtworkCollectionFromStorage: typeof updateArtworkCollectionFromStorage,
    updateArtworkDonated: typeof updateArtworkDonated
}