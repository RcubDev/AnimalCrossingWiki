import { MuseumModel } from "./MuseumModel";
import { MonthsAvaliable } from "./CritterCollectionModel";

export interface CritterModel extends MuseumModel {
    time: string,
    catchStartTime: Array<number>
    catchEndTime: Array<number>
    monthsAvailable: MonthsAvaliable
    rarity: number,
    rarityName: string,
    weather: string,
    caught: boolean
}