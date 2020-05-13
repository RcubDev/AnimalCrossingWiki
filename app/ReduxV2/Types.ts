import { ItemCategory } from "../../models/CollectionModelsV2/items"

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

export type {
    UpdateItemDonatedAction,
    UpdateCreatureDonatedAction,
    UpdateCreatureCaughtAction,
    UpdateItemCataloggedAction
}

export type ReduxActions = 
    UpdateItemDonatedAction | UpdateCreatureCaughtAction | UpdateCreatureDonatedAction |
    UpdateItemCataloggedAction;