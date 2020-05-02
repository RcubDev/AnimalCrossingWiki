import { MonthsAvaliable } from "../fishModel";

export interface AdvancedSortFilterFishModel extends MonthsAvaliable {
    caught: boolean;
    donated: boolean;
    notCaught: boolean;
    notDonated: boolean;
    availableNow: boolean;
    availableThisMonth: boolean;
    shadowSize: number;
    location: number;
    rarity: number;
    value: number;
  }