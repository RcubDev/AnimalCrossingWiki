import { CritterModel } from "./CritterModel";

export interface NewFishModel extends CritterModel {
    location: number,
    locationName: string,
    shadowSize: number,
    shadowSizeName: string
}