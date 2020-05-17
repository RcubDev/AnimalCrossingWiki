import { ObtainedModel } from "./ObtainedModel";

export interface ReactionModel extends ObtainedModel {
  sourceSheet: SourceSheet;
  name: string;
  image: string;
  source: string[];
  internalId?: null;
  uniqueEntryId?: string;
}

export enum SourceSheet {
  Reactions = 'Reactions',
}
