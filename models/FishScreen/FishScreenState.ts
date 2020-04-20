import { FishModel } from "../models";

export interface FishScreenState {
    isReady: boolean,
    selectedFish: FishModel | null
}