import { combineReducers } from 'redux';
import fish from '../../data/fish.json';
import { UPDATE_FISH_CAUGHT, UPDATE_FISH_DONATED, FishActionTypes, UpdateFishDonated, UpdateFishCaught, UpdateFishFilter, UPDATE_FISH_FILTER, UPDATE_FISH_COLLECTION, UpdateFishCollection, UPDATE_IN_GAME_DATE, UPDATE_HEMISPHERE, UpdateInGameTime, UpdateHemisphere, UPDATE_FISH_SORT, UpdateFishSort } from './Types'
import { ApplicationState } from '../../models/ApplicationState/ApplicationState';
import { AsyncStorage } from 'react-native';
import { AdvancedSortFilterFishModel } from '../../models/FishScreen/AdvancedSortFilterFishModel';
import { NewFishModel } from '../../models/CollectionModels/NewFishModel';
import { AdvancedSortFishModel } from '../../models/FishScreen/AdvancedSortFishModel';

const defaultAdvancedSortFilter: AdvancedSortFilterFishModel = {
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
  catchableNow: false
};

const defaultSortOptions: AdvancedSortFishModel = {
  shadowSize: false,
  ascending: false,
  descending: false,
  value: false,
  name: false,
  rarity: false,
  critterpediaHorizontal: false,
  critterpediaVertical: false
}

const defaultFishCollection: Array<NewFishModel> = fish.fish;

const INITIAL_STATE2: ApplicationState = { fish: { fishCollection: [], fishAdvancedSortFilter: defaultAdvancedSortFilter, fishAdvancedSort: defaultSortOptions }, userSettings: { isNorthernHemisphere: true, inGameTime: { minutes: 0 } } };

const firstTimeUserState: ApplicationState = { fish: { fishCollection: fish.fish, fishAdvancedSortFilter: defaultAdvancedSortFilter, fishAdvancedSort: defaultSortOptions }, userSettings: { isNorthernHemisphere: true, inGameTime: { minutes: 0 } } };




const collectionReducer = (state = INITIAL_STATE2, action: FishActionTypes): ApplicationState => {
  switch (action.type) {
    case UPDATE_FISH_CAUGHT:
      return updateFishCaughtAction(state, action);
    case UPDATE_FISH_DONATED:
      return updateFishDonatedAction(state, action);
    case UPDATE_FISH_FILTER:
      return updateAdvancedSortFilterFish(state, action);
    case UPDATE_FISH_COLLECTION:
      return updateFishCollectionFromStorage(state, action);
    case UPDATE_IN_GAME_DATE:
      return updateInGameTime(state, action);
    case UPDATE_HEMISPHERE:
      return updateHemisphere(state, action);
    case UPDATE_FISH_SORT:
      return updateFishSort(state, action);
    default:
      return state;
  }
};

function updateInGameTime(state: ApplicationState, action: UpdateInGameTime): ApplicationState {
  let newState = state;
  newState.userSettings.inGameTime = action.payload;
  AsyncStorage.setItem('InGameTimeOffSet', JSON.stringify(action.payload));
  return Object.assign({}, state, newState);
}

function updateFishSort(state: ApplicationState, action: UpdateFishSort): ApplicationState {
  let newState = state;
  newState.fish.fishAdvancedSort = action.payload;
  return Object.assign({}, state, newState);
}

function updateHemisphere(state: ApplicationState, action: UpdateHemisphere): ApplicationState {
  let newState = state;
  newState.userSettings.isNorthernHemisphere = action.payload;
  AsyncStorage.setItem('IsNorthernHemisphere', action.payload.toString());
  return Object.assign({}, state, newState);
}

function updateAdvancedSortFilterFish(state: ApplicationState, action: UpdateFishFilter): ApplicationState {
  return Object.assign({}, state, { ...action.payload });
}

function updateFishCollectionFromStorage(state: ApplicationState, action: UpdateFishCollection): ApplicationState {
  let newState = state;
  newState.fish.fishCollection = action.payload;
  return Object.assign({}, state, newState);
}

function updateFishCaughtAction(state: ApplicationState, action: UpdateFishCaught): ApplicationState {
  console.log('update fish caught reducer');
  const updatedCollection = state.fish.fishCollection.map(fish => fish.id === action.payload.index ? { ...fish, caught: action.payload.caught } : fish);
  AsyncStorage.setItem('fishStore', JSON.stringify(updatedCollection));
  return {
    ...state, fish: { ...state.fish, fishCollection: updatedCollection }
  };
}

function updateFishDonatedAction(state: ApplicationState, action: UpdateFishDonated): ApplicationState {
  const updatedCollection = state.fish.fishCollection.map(fish => fish.id === action.payload.index ? { ...fish, caught: action.payload.donated ? true : fish.caught, donated: action.payload.donated } : fish);
  AsyncStorage.setItem('fishStore', JSON.stringify(updatedCollection));
  return {
    ...state, fish: { ...state.fish, fishCollection: updatedCollection }
  };
}

export default combineReducers({
  appState: collectionReducer,
});