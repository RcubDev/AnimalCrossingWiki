import { FishApplicationState } from "./FishApplicationState";
import { UserSettingsState } from "./UserSettingsState";
import { BugApplicationState } from "./BugApplicationState";
import { FossilApplicationState } from "./FossilApplicationState";
import { ArtworkApplicationState } from "./ArtworkApplicationState";

export interface ApplicationState {
    fish: FishApplicationState
    bug: BugApplicationState,
    fossil: FossilApplicationState,
    art: ArtworkApplicationState,
    userSettings: UserSettingsState
}