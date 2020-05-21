import { ItemSourceSheet, ItemModel } from "../../models/CollectionModelsV2/items"
import { CreatureModel } from "../../models/CollectionModelsV2/creatures"
import { ReactionModel } from "../../models/CollectionModelsV2/reactions"
import { VillagerModel } from "../../models/CollectionModelsV2/villagers"

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
    subcategory: ItemSourceSheet
}

export interface ObtainedPayload {
    name: string,
    obtained: boolean
}

export interface VillagerFavoritedPayload {
    name: string,
    favorite: boolean
}

export interface VillagerInVillagePayload {
    name: string,
    inVillage: boolean
}

//Tracking
export const UPDATE_CREATURE_CAUGHT = "UPDATE_CREATURE_CAUGHT"
export const UPDATE_CREATURE_DONATED = "UPDATE_CREATURE_DONATED"
export const UPDATE_ITEM_DONATED = "UPDATE_ITEM_DONATED"
export const UPDATE_ITEM_CATALOGGED = "UPDATE_ITEM_CATALOGGED"
export const UPDATE_MODEL_OBTAINED = "UPDATE_MODEL_OBTAINED"
export const UPDATE_VILLAGER_FAVORITED = "UPDATE_VILLAGER_FAVORITED"
export const UPDATE_VILLAGER_IN_VILLAGE = "UPDATE_VILLAGER_IN_VILLAGE"
//Stored Collections
export const UPDATE_FISH_COLLECTION = "UPDATE_FISH_COLLECTION"
export const UPDATE_BUG_COLLECTION = "UPDATE_BUG_COLLECTION"
export const UPDATE_FOSSIL_COLLECTION = "UPDATE_FOSSIL_COLLECTION"
export const UPDATE_ARTWORK_COLLECTION = "UPDATE_ARTWORK_COLLECTION"
export const UPDATE_KKSONG_COLLECTION = "UPDATE_KKSONG_COLLECTION"
export const UPDATE_REACTION_COLLECTION = "UPDATE_REACTION_COLLECTION"
export const UPDATE_VILLAGER_COLLECTION = "UPDATE_VILLAGER_COLLECTION"
export const UPDATE_FURNITURE_COLLECTION = "UPDATE_FURNITURE_COLLECTION"
export const UPDATE_CLOTHING_COLLECTION = "UPDATE_CLOTHING_COLELCTION"

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

interface UpdateModelObtainedAction {
    type: typeof UPDATE_MODEL_OBTAINED,
    payload: ObtainedPayload
}

interface UpdateVillagerFavoritedAction {
    type: typeof UPDATE_VILLAGER_FAVORITED,
    payload: VillagerFavoritedPayload
}

interface UpdateVillagerInVillageAction {
    type: typeof UPDATE_VILLAGER_IN_VILLAGE,
    payload: VillagerInVillagePayload
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

interface UpdateKKSongCollectionAction {
    type: typeof UPDATE_KKSONG_COLLECTION,
    payload: Array<ItemModel>
}

interface UpdateReactionCollectionAction {
    type: typeof UPDATE_REACTION_COLLECTION,
    payload: Array<ReactionModel>
}

interface UpdateVillagerCollectionAction {
    type: typeof UPDATE_VILLAGER_COLLECTION,
    payload: Array<VillagerModel>
}

interface UpdateFurnitureCollectionAction {
    type: typeof UPDATE_FURNITURE_COLLECTION,
    payload: Array<ItemModel>
}

interface UpdateClothingCollectionAction {
    type: typeof UPDATE_CLOTHING_COLLECTION,
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
    UpdateHemisphereAction,
    UpdateKKSongCollectionAction,
    UpdateReactionCollectionAction,
    UpdateModelObtainedAction,
    UpdateVillagerCollectionAction,
    UpdateFurnitureCollectionAction,
    UpdateClothingCollectionAction,
    UpdateVillagerFavoritedAction,
    UpdateVillagerInVillageAction
}

export type ReduxActions = 
    UpdateItemDonatedAction | UpdateCreatureCaughtAction | UpdateCreatureDonatedAction |
    UpdateItemCataloggedAction | UpdateFishCollectionAction | UpdateBugCollectionAction |
    UpdateFossilCollectionAction | UpdateArtworkCollectionAction | UpdateInGameTimeAction |
    UpdateHemisphereAction | UpdateKKSongCollectionAction | UpdateReactionCollectionAction |
    UpdateModelObtainedAction | UpdateVillagerCollectionAction | UpdateFurnitureCollectionAction
    | UpdateClothingCollectionAction | UpdateVillagerFavoritedAction | UpdateVillagerInVillageAction;