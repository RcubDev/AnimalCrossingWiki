import { FishModel } from "../fishModel";

export interface FishCardModel {
    fish: FishModel,
    caught: boolean,
    donated: boolean
}