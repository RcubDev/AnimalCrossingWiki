import { MuseumModel } from "../../models/CollectionModels/MuseumModel";
import { FilterCollectionCommon } from "./CommonFilters";

export function FilterCollectionMuseum(type: string, value: string, operation: string, list: Array<MuseumModel>): Array<MuseumModel> {
    switch(type){
        case "donated":
            return FilterCollectionByDonated(operation, value, list);
        default:
            let commonFilter = FilterCollectionCommon(type, value, operation, list);
            return list.filter(x => commonFilter.map(y => y.id).includes(x.id));
    }
}

function FilterCollectionByDonated(operation: string, value: string, list: Array<MuseumModel>): Array<MuseumModel> {
    //Operation should be ":"
    //value = operation.substr(1);
    switch (value.toLowerCase()) {
        case "yes":
        case "true":
        case "donated":
            return list.filter(x => x.donated);
        case "no":
        case "false":
        case "not donated":
            return list.filter(x => !x.donated);
        default:
            return [];
    }
}
