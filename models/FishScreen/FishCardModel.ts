import { CritterCollectionModel } from "../fishModel";

export interface CritterCollectionCardModel {
    collection: CritterCollectionModel,
    caught: boolean,
    donated: boolean
}