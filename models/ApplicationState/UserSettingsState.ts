import { InGameTimeOffSetPayload } from "../../app/Redux/Types";

export interface UserSettingsState {
    inGameTime: InGameTimeOffSetPayload,
    isNorthernHemisphere: boolean
}