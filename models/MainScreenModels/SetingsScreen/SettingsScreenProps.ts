import { updateInGameTime, updateHemisphere } from "../../../app/ReduxV2/CollectionActions";
import { ApplicationStateV2 } from "../../ApplicationState/ApplicationStateV2";

export interface SettingsScreenProps {
    appState: ApplicationStateV2,
    updateInGameTime: typeof updateInGameTime,
    updateHemisphere: typeof updateHemisphere,        
}