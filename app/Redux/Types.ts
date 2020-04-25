export interface FishCaughtPayload {
    index:number,
    caught: boolean
}
//I realized these can be reused
export interface FishDonatedPayload {
    index:number,
    donated: boolean
}

export const UPDATE_FISH_CAUGHT = 'UPDATE_FISH_CAUGHT';
export const UPDATE_FISH_DONATED = 'UPDATE_FISH_DONATED';

interface UpdateFishCaught {
    type: typeof UPDATE_FISH_CAUGHT,
    payload: FishCaughtPayload
}

interface UpdateFishDonated {
    type: typeof UPDATE_FISH_DONATED,
    payload: FishDonatedPayload
}

export type {UpdateFishDonated, UpdateFishCaught};

export type FishActionTypes = UpdateFishCaught | UpdateFishDonated;