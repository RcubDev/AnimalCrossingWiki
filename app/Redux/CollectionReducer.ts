import { combineReducers } from 'redux';
import fish from '../../data/fish.json';
import {UPDATE_FISH_CAUGHT, UPDATE_FISH_DONATED, FishActionTypes, FishCaughtPayload, FishDonatedPayload, UpdateFishDonated, UpdateFishCaught} from './Types'
import { CollectionStateModel } from '../../models/CollectionStateModel';
import { updateFishCaught, updateFishDonated } from './CollectionActions';

const INITIAL_STATE2:CollectionStateModel = { fish: fish.map(x => {return {fish: x, caught: false, donated: false}})};

const collectionReducer = (state = INITIAL_STATE2, action: FishActionTypes): CollectionStateModel => {
    switch (action.type) {
      case UPDATE_FISH_CAUGHT:
          return updateFishCaughtAction(state, action);
      case UPDATE_FISH_DONATED:
        return updateFishDonatedAction(state, action);
      default:
        return state
    }
  };

function updateFishCaughtAction(state: CollectionStateModel, action: UpdateFishCaught): CollectionStateModel {
    const currentCollection = state;
    const updatedFish = currentCollection.fish[action.payload.index];
    updatedFish.caught = action.payload.caught;    
    let updatedCollection = Object.assign({}, currentCollection)
    return updatedCollection;
}

function updateFishDonatedAction(state: CollectionStateModel, action: UpdateFishDonated): CollectionStateModel {
    const currentCollection = state;
    const updatedFish = currentCollection.fish[action.payload.index];
    if(action.payload.donated) {
        updatedFish.caught = true;
    }
    updatedFish.donated = action.payload.donated;
    let updatedCollection = Object.assign({}, currentCollection)
    return updatedCollection;
}

export default combineReducers({
  collections: collectionReducer,
});