import { NavigationScreenProp } from "react-navigation";
import { ApplicationStateV2 } from "../../ApplicationState/ApplicationStateV2";
import { updateVillagerCollectionFromStorage, updateVillagerFavorited, updateVillagerInVillage } from "../../../app/ReduxV2/CollectionActions";

export interface VillagersScreenProps {
        navigation: NavigationScreenProp<any>,
        appState: ApplicationStateV2,
        route: {
                key: string,
                name: string,
                params: {
                        species: string,
                        personality: string
                }
        }
        updateVillagerCollectionFromStorage: typeof updateVillagerCollectionFromStorage,
        updateVillagerFavorited: typeof updateVillagerFavorited,
        updateVillagerInVillage: typeof updateVillagerInVillage
}