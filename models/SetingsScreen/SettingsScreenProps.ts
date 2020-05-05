import { UserSettingsState } from "../ApplicationState/UserSettingsState";
import { updateInGameTime, updateHemisphere, updateFishFilter, updateFishCollectionFromStorage } from "../../app/Redux/CollectionActions";
import { ApplicationState } from "../ApplicationState/ApplicationState";

export interface SettingsScreenProps {
    appState: ApplicationState,
    updateInGameTime: typeof updateInGameTime,
    updateHemisphere: typeof updateHemisphere,        
}