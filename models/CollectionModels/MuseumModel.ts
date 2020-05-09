import { CommonCollectionModel } from "./CommonCollectionModel";

export interface MuseumModel extends CommonCollectionModel {
    donated: boolean,
    blathersSays: string
}