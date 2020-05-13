import { ItemCategory } from "../../models/CollectionModelsV2/items"
import { CreatureModel } from "../../models/CollectionModelsV2/creatures"

export interface CaughtPayload {
    id: number,
    caught: boolean,
    type: "Fish" | "Bug"
}

export interface CreatureDonatedPayload {
    id: number,
    donated: boolean,
    type: "Fish" | "Bug"
}

export interface ItemDonatedPayload {
    id?: number,
    name: string,
    donated: boolean
    type: "Fossil" | "Artwork"
}

export interface CataloggedPayload {
    name: string,
    catalogged?: boolean,
    category: "Furniture" | "Clothing" | "KKSongs"
    subcategory: ItemCategory
}

export const UPDATE_CREATURE_CAUGHT = "UPDATE_CREATURE_CAUGHT"
export const UPDATE_CREATURE_DONATED = "UPDATE_CREATURE_DONATED"
export const UPDATE_ITEM_DONATED = "UPDATE_ITEM_DONATED"
export const UPDATE_ITEM_CATALOGGED = "UPDATE_ITEM_CATALOGGED"
export const UPDATE_FISH_COLLECTION = "UPDATE_FISH_COLLECTION"

interface UpdateCreatureCaughtAction {
    type: typeof UPDATE_CREATURE_CAUGHT,
    payload: CaughtPayload
}

interface UpdateCreatureDonatedAction {
    type: typeof UPDATE_CREATURE_DONATED,
    payload: CreatureDonatedPayload
}

interface UpdateItemDonatedAction {
    type: typeof UPDATE_ITEM_DONATED,
    payload: ItemDonatedPayload
}

interface UpdateItemCataloggedAction {
    type: typeof UPDATE_ITEM_CATALOGGED,
    payload: CataloggedPayload
}

interface UpdateFishCollectionAction {
    type: typeof UPDATE_FISH_COLLECTION,
    payload: Array<CreatureModel>
}

export type {
    UpdateItemDonatedAction,
    UpdateCreatureDonatedAction,
    UpdateCreatureCaughtAction,
    UpdateItemCataloggedAction,
    UpdateFishCollectionAction
}

export type ReduxActions = 
    UpdateItemDonatedAction | UpdateCreatureCaughtAction | UpdateCreatureDonatedAction |
    UpdateItemCataloggedAction | UpdateFishCollectionAction;