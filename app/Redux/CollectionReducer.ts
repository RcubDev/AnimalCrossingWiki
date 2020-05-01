import { combineReducers } from 'redux';
import fish from '../../data/fish.json';
import {UPDATE_FISH_CAUGHT, UPDATE_FISH_DONATED, FishActionTypes, FishCaughtPayload, FishDonatedPayload, UpdateFishDonated, UpdateFishCaught} from './Types'
import { CollectionStateModel } from '../../models/CollectionStateModel';
import { updateFishCaught, updateFishDonated } from './CollectionActions';
import { ApplicationState } from '../../models/ApplicationState';

const INITIAL_STATE2: ApplicationState = { fish: {fishCollection: fish.fish}};

const collectionReducer = (state = INITIAL_STATE2, action: FishActionTypes): ApplicationState => {
    switch (action.type) {
      case UPDATE_FISH_CAUGHT:
          return updateFishCaughtAction(state, action);
      case UPDATE_FISH_DONATED:
        return updateFishDonatedAction(state, action);
      default:
        return state
    }
  };

function updateFishCaughtAction(state: ApplicationState, action: UpdateFishCaught): ApplicationState {
    const appState = state;
    let updatedFish = appState.fish.fishCollection.find(item => item.id === action.payload.index);
    if(updatedFish){
      updatedFish.caught = action.payload.caught;    
    }
    let updatedCollection = Object.assign({}, state, appState)
    return updatedCollection;
}

function updateFishDonatedAction(state: ApplicationState, action: UpdateFishDonated): ApplicationState {
    const appState = state;
    let updatedFish = appState.fish.fishCollection.find(item => item.id === action.payload.index);
    if(updatedFish){
      if(action.payload.donated) {
          updatedFish.caught = true;
      }
      updatedFish.donated = action.payload.donated;
    }
    let updatedCollection = Object.assign({}, state, appState)
    return updatedCollection;
}

export default combineReducers({
  collections: collectionReducer,
});