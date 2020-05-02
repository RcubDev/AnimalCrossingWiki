import { combineReducers } from 'redux';
import fish from '../../data/fish.json';
import {UPDATE_FISH_CAUGHT, UPDATE_FISH_DONATED, FishActionTypes, FishCaughtPayload, FishDonatedPayload, UpdateFishDonated, UpdateFishCaught, UpdateFishFilter, UPDATE_FISH_FILTER} from './Types'
import { CollectionStateModel } from '../../models/CollectionStateModel';
import { updateFishCaught, updateFishDonated } from './CollectionActions';
import { ApplicationState } from '../../models/ApplicationState';

const INITIAL_STATE2: ApplicationState = { fish: {fishCollection: fish.fish, fishAdvancedSortFilter: {
  caught: false,
  donated: false,
  notCaught: false,
  notDonated: false,
  availableNow: false,
  availableThisMonth: false,
  shadowSize: -1,
  location: -1,
  rarity: -1,
  value: -1,
  jan: false,
  feb: false,
  mar: false,
  apr: false,
  may: false,
  jun: false,
  jul: false,
  aug: false,
  sep: false,
  oct: false,
  nov: false,
  dec: false,
}}};

const collectionReducer = (state = INITIAL_STATE2, action: FishActionTypes): ApplicationState => {
    switch (action.type) {
      case UPDATE_FISH_CAUGHT:
          return updateFishCaughtAction(state, action);
      case UPDATE_FISH_DONATED:
        return updateFishDonatedAction(state, action);
      case UPDATE_FISH_FILTER:
        return updateAdvancedSortFilterFish(state, action);
      default:
        return state
    }
  };

function updateAdvancedSortFilterFish(state: ApplicationState, action: UpdateFishFilter){
  return Object.assign({}, state, {...action.payload})
}

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