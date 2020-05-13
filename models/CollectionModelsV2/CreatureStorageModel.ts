import { MuseumStorageModel } from "./MuseumModelV2";
import { CreatureModel } from "./creatures";
import { MuseumModel } from "../CollectionModels/MuseumModel";

export interface CreatureCaughtModel extends MuseumModel {
    caught: boolean
}
