import { rootReducerAsFunction, mergeReducerState, generateInitialState } from '../utils';

describe('utils', () => {
  const reducers = {
    profile: (state = { name: 'Leonardo Davinci', username: 'kobra3000' }, action) => {
      switch (action.type) {
        case 'update':
          return {
            ...state,
            ...action.payload,
          };
        default:
          return state;
      }
    },
    config: (state = { api: 'https://someapikey.com' }, action) => {
      switch (action.type) {
        default:
          return state;
      }
    },
  };

  test('rootReducerAsFunction', () => {
    const reducer = () => ({ name: 'Albert ' });
    const prevState = { username: 'kobra3000' };
    const action = {};
    const state = rootReducerAsFunction(reducer, prevState, action);
    expect(state).toEqual({ ...reducer(), ...prevState });
  });

  test('mergeReducerState', () => {
    // ERROR: if 2 differnet reducers have same action type, they both going to be mutated.
    const prevState = {
      profile: { name: 'Leonardo Davinci', username: 'kobra3000' },
      config: { api: 'https://someapikey.com' },
    };

    const reducer = mergeReducerState(reducers);
    expect(reducer(prevState, { type: 'update', payload: { something: 'something' } })).toEqual({
      profile: { name: 'Leonardo Davinci', username: 'kobra3000', something: 'something' },
      config: { api: 'https://someapikey.com' },
    });
  });

  test('generateInitialState with initial state from reducers', () => {
    const initialState = generateInitialState(reducers);
    expect(initialState).toEqual({
      profile: { name: 'Leonardo Davinci', username: 'kobra3000' },
      config: { api: 'https://someapikey.com' },
    });
  });

  test('generateInitialState with no reducer state, just initialState', () => {
    const emptyReducers = {
      user: () => {},
      config: () => {},
    };

    const initialState = generateInitialState(emptyReducers, {
      user: { name: 'Vladislava' },
      config: { url: 'https://google.com' },
    });
    expect(initialState).toEqual({
      user: { name: 'Vladislava' },
      config: { url: 'https://google.com' },
    });
  });
});
