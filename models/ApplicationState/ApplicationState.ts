import { FishApplicationState } from "../FishApplicationState";
import { UserSettingsState } from "./UserSettingsState";

export interface ApplicationState {
    fish: FishApplicationState
    userSettings: UserSettingsState
}