import { combineReducers } from 'redux';
import { UPDATE_FISH_CAUGHT, UPDATE_FISH_DONATED, FishActionTypes, UpdateFishDonated, UpdateFishCaught, UpdateFishFilter, UPDATE_FISH_FILTER, UPDATE_FISH_COLLECTION, UpdateFishCollection, UPDATE_IN_GAME_DATE, UPDATE_HEMISPHERE, UpdateInGameTime, UpdateHemisphere, UPDATE_FISH_SORT, UpdateFishSort, UPDATE_BUG_COLLECTION, UpdateBugCollection, UpdateBugCaught, UpdateBugDonated, UpdateBugSort, UpdateBugFilter, UPDATE_BUG_CAUGHT, UPDATE_BUG_DONATED, UPDATE_BUG_FILTER, UPDATE_BUG_SORT, UPDATE_FOSSIL_COLLECTION, UpdateFossilCollection, UPDATE_FOSSIL_DONATED, UpdateFossilDonated, UpdateArtworkDonated, UpdateArtworkCollection, UPDATE_ARTWORK_COLLECTION, UPDATE_ARTWORK_DONATED } from './Types'
import { ApplicationState } from '../../models/ApplicationState/ApplicationState';
import { AsyncStorage } from 'react-native';
import { AdvancedSortFilterFishModel } from '../../models/MainScreenModels/FishScreen/AdvancedSortFilterFishModel';
import { AdvancedSortFishModel } from '../../models/Sort/AdvancedSortFishModel';

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

const INITIAL_STATE2: ApplicationState = {
  fish: {
    fishCollection: [],
    fishAdvancedSortFilter: defaultAdvancedSortFilter,
    fishAdvancedSort: defaultSortOptions
  },
  bug: {
    bugCollection: [],
    bugAdvancedFilter: defaultAdvancedSortFilter,
    bugAdvancedSort: defaultSortOptions
  },
  fossil: {
    fossilCollection: []
  },
  art: {
    artworkCollection: []
  },
  userSettings: {
    isNorthernHemisphere: true,
    inGameTime: { minutes: 0 }
  }
};



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
    case UPDATE_FISH_SORT:
      return updateFishSort(state, action);
    case UPDATE_IN_GAME_DATE:
      return updateInGameTime(state, action);
    case UPDATE_HEMISPHERE:
      return updateHemisphere(state, action);
    case UPDATE_BUG_COLLECTION:
      return updateBugCollectionFromStorage(state, action);
    case UPDATE_BUG_CAUGHT:
      return updateBugCaughtAction(state, action);
    case UPDATE_BUG_DONATED:
      return updateBugDonatedAction(state, action);
    case UPDATE_BUG_FILTER:
      return updateAdvancedSortFilterBug(state, action);
    case UPDATE_BUG_SORT:
      return updateBugSort(state, action);
    case UPDATE_BUG_COLLECTION:
      return updateBugCollectionFromStorage(state, action);
    case UPDATE_FOSSIL_COLLECTION:
      return updateFossilCollectionFromStorage(state, action);
    case UPDATE_FOSSIL_DONATED:
      return updateFossilDonated(state, action);
    case UPDATE_ARTWORK_COLLECTION:
      return updateArtworkCollectionFromStorage(state, action);
    case UPDATE_ARTWORK_DONATED:
      return updateArtworkDonated(state, action);
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

function updateBugSort(state: ApplicationState, action: UpdateBugSort): ApplicationState {
  let newState = state;
  newState.bug.bugAdvancedSort = action.payload;
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

function updateAdvancedSortFilterBug(state: ApplicationState, action: UpdateBugFilter): ApplicationState {
  let newState = state;
  newState.bug.bugAdvancedFilter = action.payload;
  return Object.assign({}, state, newState);
}

function updateFishCollectionFromStorage(state: ApplicationState, action: UpdateFishCollection): ApplicationState {
  let newState = state;
  newState.fish.fishCollection = action.payload;
  return Object.assign({}, state, newState);
}

function updateBugCollectionFromStorage(state: ApplicationState, action: UpdateBugCollection): ApplicationState {
  let newState = state;
  newState.bug.bugCollection = action.payload;
  return Object.assign({}, state, newState);
}

function updateFossilCollectionFromStorage(state: ApplicationState, action: UpdateFossilCollection): ApplicationState {
  let newState = state;
  newState.fossil.fossilCollection = action.payload;
  return Object.assign({}, state, newState);
}

function updateArtworkCollectionFromStorage(state: ApplicationState, action: UpdateArtworkCollection): ApplicationState {
  let newState = state;
  newState.art.artworkCollection = action.payload;
  return Object.assign({}, state, newState);
}

function updateFishCaughtAction(state: ApplicationState, action: UpdateFishCaught): ApplicationState {
  const updatedCollection = state.fish.fishCollection.map(fish => fish.id === action.payload.id ? { ...fish, caught: action.payload.caught } : fish);
  AsyncStorage.setItem('fishStore', JSON.stringify(updatedCollection));
  return {
    ...state, fish: { ...state.fish, fishCollection: updatedCollection }
  };
}

function updateBugCaughtAction(state: ApplicationState, action: UpdateBugCaught): ApplicationState {
  const appState = state;
  let updatedBug = appState.bug.bugCollection.find(item => item.id === action.payload.id);
  if (updatedBug) {
    updatedBug.caught = action.payload.caught;
  }
  let updatedCollection = Object.assign({}, state, appState)
  AsyncStorage.setItem('bugStore', JSON.stringify(updatedCollection.bug.bugCollection));
  return updatedCollection;
}

function updateFishDonatedAction(state: ApplicationState, action: UpdateFishDonated): ApplicationState {
  const updatedCollection = state.fish.fishCollection.map(fish => fish.id === action.payload.id ? { ...fish, caught: action.payload.donated ? true : fish.caught, donated: action.payload.donated } : fish);
  AsyncStorage.setItem('fishStore', JSON.stringify(updatedCollection));
  return {
    ...state, fish: { ...state.fish, fishCollection: updatedCollection }
  };
}

function updateBugDonatedAction(state: ApplicationState, action: UpdateBugDonated): ApplicationState {
  const appState = state;
  let updatedBug = appState.bug.bugCollection.find(item => item.id === action.payload.id);
  if (updatedBug) {
    if (action.payload.donated) {
      updatedBug.caught = true;
    }
    updatedBug.donated = action.payload.donated;
  }
  let updatedCollection = Object.assign({}, state, appState)
  AsyncStorage.setItem('bugStore', JSON.stringify(updatedCollection.bug.bugCollection));
  return updatedCollection;
}

function updateFossilDonated(state: ApplicationState, action: UpdateFossilDonated): ApplicationState {
  const appState = state;
  let updatedFossil = appState.fossil.fossilCollection.find(item => item.id === action.payload.id);
  if (updatedFossil) {
    updatedFossil.donated = action.payload.donated;
  }
  let updatedCollection = Object.assign({}, state, appState)
  AsyncStorage.setItem('fossilStore', JSON.stringify(updatedCollection.fossil.fossilCollection));
  return updatedCollection;
}

function updateArtworkDonated(state: ApplicationState, action: UpdateArtworkDonated): ApplicationState {
  const appState = state;
  let updatedArtwork = appState.art.artworkCollection.find(item => item.id === action.payload.id);
  if (updatedArtwork) {
    updatedArtwork.donated = action.payload.donated;
  }
  let updatedCollection = Object.assign({}, state, appState)
  AsyncStorage.setItem('artworkStore', JSON.stringify(updatedCollection.art.artworkCollection));
  return updatedCollection;
}

export default combineReducers({
  appState: collectionReducer,
});