import { MonthsAvaliableModel } from "../CollectionModelsV2/MonthsAvailableModel";

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
    monthsAvailable: FilterMonths;
  }

  export interface FilterMonths extends MonthsAvaliableModel {

  }