import { CritterModel } from "./CritterModel";

export interface NewFishModel extends CritterModel {
    shadowSize: number,
    shadowSizeName: string
}