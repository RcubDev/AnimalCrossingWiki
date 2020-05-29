import { ItemModel, ItemSourceSheet } from '../../models/CollectionModelsV2/items';
import { CreatureModel } from '../../models/CollectionModelsV2/creatures';
import { ReactionModel } from '../../models/CollectionModelsV2/reactions';
import { VillagerModel } from '../../models/CollectionModelsV2/villagers';

export function KeepPropertyUndefinedElseValue(property: any, value: boolean): boolean | undefined {
    if (property === undefined) {
        return undefined;
    }
    return value;
}

export function getImageSource(model: any): string {
    let uri = '';
    if ('catalogged' in model) {
        let item = (model) as ItemModel;
        switch (item.sourceSheet) {
            case ItemSourceSheet.Music:
                if (item.variants && item.variants.length > 0 && item.variants[0].albumImage) {
                    uri = item.variants[0].albumImage;
                }
                break;
            case ItemSourceSheet.Accessories:
            case ItemSourceSheet.Bags:
            case ItemSourceSheet.Bottoms:
            case ItemSourceSheet.DressUp:
            case ItemSourceSheet.Headwear:
            case ItemSourceSheet.Shoes:
            case ItemSourceSheet.Socks:
            case ItemSourceSheet.Tops:
            case ItemSourceSheet.Umbrellas:
                if (item.variants && item.variants.length > 0 && item.variants[0].closetImage) {
                    uri = item.variants[0].closetImage;
                }
                break;
            case ItemSourceSheet.Fencing:
            case ItemSourceSheet.Floors:
            case ItemSourceSheet.Housewares:
            case ItemSourceSheet.Miscellaneous:
            case ItemSourceSheet.Photos:
            case ItemSourceSheet.Posters:
            case ItemSourceSheet.Rugs:
            case ItemSourceSheet.Tools:
            case ItemSourceSheet.WallMounted:
            case ItemSourceSheet.Wallpapers:
            case ItemSourceSheet.Fossils:
                if (item.variants && item.variants.length > 0 && item.variants[0].image) {
                    uri = item.variants[0].image;
                }
                break;
            case ItemSourceSheet.Other:
                if (item.variants && item.variants.length > 0) {
                    if (item.variants[0].inventoryImage) {
                        uri = item.variants[0].inventoryImage;
                    }
                    if (item.variants[0].storageImage) {
                        uri = item.variants[0].storageImage;
                    }
                }
                break;
        }
    }
    else if ('caught' in model) {
        let item = model as CreatureModel
        if (item.critterpediaImage) {
            uri = item.iconImage;
        }
    }
    else if ((model as ReactionModel).obtained !== undefined) {
        let item = model as ReactionModel
        if (item.image) {
            uri = item.image;
        }
    }
    else if ('inVillage' in model) {
        let item = model as VillagerModel
        if (item.iconImage) {
            uri = item.iconImage;
        }
    }

    return uri;
}