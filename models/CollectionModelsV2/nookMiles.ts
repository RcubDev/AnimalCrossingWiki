export interface NookMilesModel {
  sourceSheet: SourceSheet;
  name: string;
  image: string;
  nookMiles: number | null;
  stackSize: number | null;
  category: NookMilesCategory | null;
  filename: null | string;
  internalId: number | null;
  uniqueEntryId: string;
}

export enum NookMilesCategory {
  Housewares = 'Housewares',
  Recipe = 'Recipe',
}

export enum SourceSheet {
  NookMiles = 'Nook Miles',
}
