import { FishModel } from "../models";
import { FishCardModel } from "./FishCardModel";

export interface FishScreenState {
    isReady: boolean,
    fishList: Array<FishCardModel>
}