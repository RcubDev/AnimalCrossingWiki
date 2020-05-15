import { MonthsAvaliable } from "../CollectionModels/CritterCollectionModel";

export interface FilterModel {
    caught: boolean;
    donated: boolean;
    notCaught: boolean;
    notDonated: boolean;
    availableNow: boolean;
    location: number;
    rarity: number;
    value: number;
    catchableNow: boolean;
    shadowSize: number;
    monthsAvailable: FilterMonths;
  }

  export interface FilterMonths extends MonthsAvaliable {

  }