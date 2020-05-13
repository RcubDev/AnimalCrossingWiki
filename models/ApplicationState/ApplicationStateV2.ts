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
    furnitureItems: Array<ItemModel>,
    clothingItems: Array<ItemModel>,
    fish: {fishCollection: Array<CreatureModel>},
    bugs: {bugCollection: Array<CreatureModel>},
    artwork: Array<ItemModel>,
    fossils: Array<ItemModel>,
    reactions: Array<ReactionModel>,
    villagers: Array<VillagerModel>,
    kkSongs: Array<ItemModel>,
    recipies: Array<RecipeModel>,
    achievements: Array<AchievementModel>,
    userSettings: UserSettingsState
}