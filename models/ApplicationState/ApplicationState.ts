import { FishApplicationState } from "../FishApplicationState";
import { UserSettingsState } from "./UserSettingsState";
import { BugApplicationState } from "./BugApplicationState";

export interface ApplicationState {
    fish: FishApplicationState
    bug: BugApplicationState,
    userSettings: UserSettingsState
}