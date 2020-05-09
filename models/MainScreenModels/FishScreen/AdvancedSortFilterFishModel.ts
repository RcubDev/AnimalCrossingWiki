import { MonthsAvaliable } from "../../CollectionModels/CritterCollectionModel";
import { AdvancedFilterCritterModel } from "../../Filter/AdvancedFilterCritterModel";

export interface AdvancedSortFilterFishModel extends AdvancedFilterCritterModel {
  shadowSize: number;
}

