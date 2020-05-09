import { FishApplicationState } from "./FishApplicationState";
import { UserSettingsState } from "./UserSettingsState";
import { BugApplicationState } from "./BugApplicationState";
import { FossilApplicationState } from "./FossilApplicationState";

export interface ApplicationState {
    fish: FishApplicationState
    bug: BugApplicationState,
    fossil: FossilApplicationState,
    userSettings: UserSettingsState
}