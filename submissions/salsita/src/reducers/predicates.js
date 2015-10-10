import * as SithStates from '../constants/sithStates';

export const newSithWithId = sith => sith.get('state') === SithStates.NEW && sith.get('id');
export const loadingSith = sith => sith.get('state') === SithStates.LOADING;
export const newSith = sith => sith.get('state') === SithStates.NEW;
export const loadedSith = sith => sith.get('state') === SithStates.LOADED;
export const sithById = id => sith => sith.get('id') === id;
export const sithSpotted = sith => sith.get('spotted');
