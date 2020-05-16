import { MonthsAvaliable } from "../CollectionModels/CritterCollectionModel";

export interface FilterModel {
    caught: boolean | undefined;
    donated: boolean | undefined;
    notCaught: boolean | undefined;
    notDonated: boolean | undefined;
    availableNow: boolean | undefined;
    location: number | undefined;
    rarity: number | undefined;
    value: number | undefined;
    catchableNow: boolean | undefined;
    shadowSize: number | undefined;
    monthsAvailable: FilterMonths | undefined;
  }

  export interface FilterMonths extends MonthsAvaliable {

  }