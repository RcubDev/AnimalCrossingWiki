import { MuseumModel } from "./MuseumModel";
import { CreatureCaughtModel } from "./CreatureStorageModel";

export interface CreatureModel extends CreatureCaughtModel {
  sourceSheet: SourceSheet;
  num: number;
  name: string;
  iconImage: string;
  critterpediaImage: string;
  furnitureImage: string;
  sell: number;
  whereHow: string;
  shadow?: string;
  totalCatchesToUnlock: number;
  rainSnowCatchUp?: boolean;
  size?: CreatureSize;
  lightingType?: LightingType | null;
  iconFilename: string;
  critterpediaFilename: string;
  furnitureFilename: string;
  internalId: number;
  uniqueEntryId: string;
  colors: CreatureColor[];
  specialSell: number;
  activeMonths: ActiveMonths;
  weather?: CreatureWeather;
}

export interface ActiveMonths {
  northern: Thern[];
  southern: Thern[];
}

export interface Thern {
  month: number;
  isAllDay: boolean;
  activeHours: Array<string[]>;
  season: Season;
}

export enum Season {
  Autumn = 'autumn',
  Spring = 'spring',
  Summer = 'summer',
  Winter = 'winter',
}

export enum CreatureColor {
  Beige = 'Beige',
  Black = 'Black',
  Blue = 'Blue',
  Brown = 'Brown',
  Gray = 'Gray',
  Green = 'Green',
  LightBlue = 'Light blue',
  Orange = 'Orange',
  Pink = 'Pink',
  Purple = 'Purple',
  Red = 'Red',
  White = 'White',
  Yellow = 'Yellow',
}

export enum LightingType {
  Emission = 'Emission',
  Fluorescent = 'Fluorescent',
}

export enum CreatureSize {
  The1X1 = '1x1',
  The2X1 = '2x1',
  The2X2 = '2x2',
  The3X2 = '3x2',
}

export enum SourceSheet {
  Bugs = 'Bugs',
  Fish = 'Fish',
}

export enum CreatureWeather {
  AnyExceptRain = 'Any except rain',
  AnyWeather = 'Any weather',
  RainOnly = 'Rain only',
}
