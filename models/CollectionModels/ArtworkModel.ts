import { MuseumModel } from "./MuseumModel";

export interface ArtworkModel extends MuseumModel {
    hasFake: boolean,
    description: string
}