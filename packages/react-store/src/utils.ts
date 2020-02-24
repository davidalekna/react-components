import merge from 'lodash.merge';
import { Reducers, Action } from './types';

export function rootReducerAsFunction(reducer: Function, state: {} = {}, action: Action | {}) {
  const newState = reducer(state, action);
  return { ...state, ...newState };
  // throw new Error('Initial reducer must be an object');
}

export const mergeReducerState = <T>(reducers: Reducers | Function) => (
  prevState: T,
  action: Action,
): T => {
  // 1. will accept single reducer function as well
  if (typeof reducers === 'function') {
    return rootReducerAsFunction(reducers, prevState, action);
  }
  // 2. otherwise if its an object with reducers
  // get all keys of state
  const stateKeys = Object.keys(reducers);
  const newState = {};
  // loop over all state keys
  for (const key of stateKeys) {
    // extract reducer for per state key
    const reducer = reducers[key];
    merge(newState, {
      [key]: reducer(prevState[key], action),
    });
  }
  // merge prevState with current state
  return { ...prevState, ...newState };
};

export const generateInitialState = <T extends {} | [] = {}>(
  reducers: Reducers | Function,
  initialState: T = {} as T,
): T => {
  if (typeof reducers === 'function') {
    if (Object.keys(initialState).length) {
      return reducers(initialState, {});
    }
    return reducers(undefined, {});
  }

  const stateFromReducers = Object.keys(reducers).reduce((acc, stateName) => {
    const stateReducer = reducers[stateName];
    // should be able to merge initialState - initialState[stateName]
    return {
      ...acc,
      [stateName]: stateReducer(undefined, {}),
    };
  }, {});

  return { ...stateFromReducers, ...initialState };
};
