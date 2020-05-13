import { ItemModel } from "./items";
import { CreatureModel } from "./creatures";

export interface MuseumStorageModel {
    donated: boolean,
    donatedItem: MuseumDonationTypes
}

export const CREATURE_MUSEUM_MODEL = "CREATURE_MUSEUM_MODEL"
export const ITEM_MUSEUM_MODEL = "ITEM_MUSEUM_MODEL"

interface CreatureMuseumModel {
    type: typeof CREATURE_MUSEUM_MODEL,
    item: CreatureModel
}

interface ItemMuseumModel {
    type: typeof ITEM_MUSEUM_MODEL,
    item: ItemModel
}

export type MuseumDonationTypes = CreatureMuseumModel | ItemMuseumModel;


// function test(item: MuseumDonationTypes){
//     switch(item.type){
//         case CREATURE_MUSEUM_MODEL:
//             item.item.activeMonths;
//             break;
//         case ITEM_MUSEUM_MODEL:
//             item.item.diy = true            
//     } 
// }