import { combineReducers } from 'redux';
import fish from '../../data/fish.json';
import {UPDATE_FISH_CAUGHT, UPDATE_FISH_DONATED, FishActionTypes, FishCaughtPayload, FishDonatedPayload} from './Types'
import { CollectionStateModel } from '../../models/CollectionStateModel';

const INITIAL_STATE2:CollectionStateModel = { fish: fish.map(x => {return {fish: x, caught: false, donated: false}})};

const collectionReducer = (state = INITIAL_STATE2, action: FishActionTypes): CollectionStateModel => {
    switch (action.type) {
      case 'UPDATE_FISH_CAUGHT':
          debugger;
        const myArray = state;
        const updatedFish = myArray.fish[action.payload.index];
        updatedFish.caught = action.payload.caught;
        return myArray;
      default:
        return state
    }
  };

export default combineReducers({
  collections: collectionReducer,
});