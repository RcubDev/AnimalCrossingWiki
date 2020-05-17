export interface ConstructionModel {
  sourceSheet: SourceSheet;
  name: string;
  image: string;
  buy: number;
  category: ConstructionCategory;
  source: ConstructionSource[];
  filename: string;
  uniqueEntryId: string;
}

export enum ConstructionCategory {
  Bridge = 'Bridge',
  Door = 'Door',
  Incline = 'Incline',
  Mailbox = 'Mailbox',
  Roofing = 'Roofing',
  Siding = 'Siding',
}

export enum ConstructionSource {
  ResidentServicesUpgrade = 'Resident Services Upgrade',
  The3RDHouseUpgradeLeftRoom = '3rd House Upgrade (Left Room)',
  The4ThHouseUpgradeRightRoom = '4th House Upgrade (Right Room)',
  The5ThHouseUpgrade2NdFloor = '5th House Upgrade (2nd Floor)',
}

export enum SourceSheet {
  Construction = 'Construction',
}
