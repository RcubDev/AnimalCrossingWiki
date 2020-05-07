import { MonthsAvaliable } from "../fishModel";

export interface AdvancedFilterCritterModel extends MonthsAvaliable {
    caught: boolean;
    donated: boolean;
    notCaught: boolean;
    notDonated: boolean;
    availableNow: boolean;
    availableThisMonth: boolean;
    location: number;
    rarity: number;
    value: number;
    catchableNow: boolean;
  }