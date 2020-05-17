import { ItemSourceSheet, ItemModel } from "../../models/CollectionModelsV2/items"
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
    subcategory: ItemSourceSheet
}

//Tracking
export const UPDATE_CREATURE_CAUGHT = "UPDATE_CREATURE_CAUGHT"
export const UPDATE_CREATURE_DONATED = "UPDATE_CREATURE_DONATED"
export const UPDATE_ITEM_DONATED = "UPDATE_ITEM_DONATED"
export const UPDATE_ITEM_CATALOGGED = "UPDATE_ITEM_CATALOGGED"

//Stored Collections
export const UPDATE_FISH_COLLECTION = "UPDATE_FISH_COLLECTION"
export const UPDATE_BUG_COLLECTION = "UPDATE_BUG_COLLECTION"
export const UPDATE_FOSSIL_COLLECTION = "UPDATE_FOSSIL_COLLECTION"
export const UPDATE_ARTWORK_COLLECTION = "UPDATE_ARTWORK_COLLECTION"

//Other
export const UPDATE_IN_GAME_TIME = "UPDATE_IN_GAME_TIME"
export const UPDATE_HEMISPHERE = "UPDATE_HEMISPHERE"

//Tracking Actions
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

//Collection Actions
interface UpdateFishCollectionAction {
    type: typeof UPDATE_FISH_COLLECTION,
    payload: Array<CreatureModel>
}

interface UpdateBugCollectionAction {
    type: typeof UPDATE_BUG_COLLECTION,
    payload: Array<CreatureModel>
}

interface UpdateFossilCollectionAction {
    type: typeof UPDATE_FOSSIL_COLLECTION,
    payload: Array<ItemModel>
}

interface UpdateArtworkCollectionAction {
    type: typeof UPDATE_ARTWORK_COLLECTION,
    payload: Array<ItemModel>
}

//Other Actions
interface UpdateInGameTimeAction {
    type: typeof UPDATE_IN_GAME_TIME,
    payload: number
}

interface UpdateHemisphereAction {
    type: typeof UPDATE_HEMISPHERE,
    payload: boolean
}



export type {
    UpdateItemDonatedAction,
    UpdateCreatureDonatedAction,
    UpdateCreatureCaughtAction,
    UpdateItemCataloggedAction,
    UpdateFishCollectionAction,
    UpdateBugCollectionAction,
    UpdateFossilCollectionAction,
    UpdateArtworkCollectionAction,
    UpdateInGameTimeAction,
    UpdateHemisphereAction
}

export type ReduxActions = 
    UpdateItemDonatedAction | UpdateCreatureCaughtAction | UpdateCreatureDonatedAction |
    UpdateItemCataloggedAction | UpdateFishCollectionAction | UpdateBugCollectionAction |
    UpdateFossilCollectionAction | UpdateArtworkCollectionAction | UpdateInGameTimeAction | UpdateHemisphereAction;