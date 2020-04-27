import { CritterCollectionModel } from "../models";
import { CritterCollectionCardModel } from "./FishCardModel";

export interface FishScreenState {
    isReady: boolean,
    fishList: Array<CritterCollectionCardModel>
}