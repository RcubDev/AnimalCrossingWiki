import { CataloggedItemModel } from "../CollectionModelsV2/CataloggedItemModel";
import { CreatureCaughtModel } from "../CollectionModelsV2/CreatureStorageModel";
import { MuseumStorageModel } from "../CollectionModelsV2/MuseumModelV2";
import { ReactionModel } from "../CollectionModelsV2/reactions";
import { VillagerModel } from "../CollectionModelsV2/villagers";
import { RecipeModel } from "../CollectionModelsV2/recipes";
import { AchievementModel } from "../CollectionModelsV2/achievements";
import { CreatureModel } from "../CollectionModelsV2/creatures";
import { ItemModel } from "../CollectionModelsV2/items";
import { UserSettingsState } from "./UserSettingsState";

export interface ApplicationStateV2 {
    furnitureItems: {furnitureCollection: Array<ItemModel>},
    clothingItems: {clothingCollection: Array<ItemModel>},
    fish: {fishCollection: Array<CreatureModel>},
    bugs: {bugCollection: Array<CreatureModel>},
    artwork: {artworkCollection: Array<ItemModel>},
    fossils: {fossilCollection: Array<ItemModel>},
    reactions: {reactionCollection: Array<ReactionModel>},
    villagers: {villagerCollection: Array<VillagerModel>},
    kkSongs: {kkSongCollection: Array<ItemModel>},
    recipies: {recipieCollection: Array<RecipeModel>},
    achievements: {achievementCollection: Array<AchievementModel>},
    userSettings: UserSettingsState
}