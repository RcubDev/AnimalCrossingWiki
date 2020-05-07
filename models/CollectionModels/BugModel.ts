import { CritterModel } from "./CritterModel";

export interface BugModel extends CritterModel{
    isBug: boolean,
    location: number,
    locationName: string
}