import React, { useEffect, useState, ReactNode, useMemo } from 'react';
import { Subject, of, empty } from 'rxjs';
import { scan, mergeMap, filter } from 'rxjs/operators';
import { merge, cloneDeep } from 'lodash';
import {
  Reducers,
  State,
  Store,
  Action,
  StoreProps,
  SyncAction,
} from './types';

const actions$ = new Subject();

export const dispatch = (next: Action) => actions$.next(next);

const mergeReducerState = reducers => (prevState, action) => {
  // 1. will accept single reducer function as well
  if (typeof reducers === 'function') {
    const newState = reducers(prevState, action);
    return { ...prevState, ...newState };
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

export const useStore = ({ reducers, initialState = {} }: StoreProps) => {
  const memoState = useMemo(() => initialState, [initialState]);
  const [state, update] = useState(memoState);

  useEffect(() => {
    const s = actions$
      .pipe(
        mergeMap((action: Action) => {
          switch (typeof action) {
            // async actions
            case 'function':
              return action(actions$);
            // sync actions
            case 'object':
              return of(action);
            // wrong type
            default:
              console.error(
                `Action must return a function or an object, your one has returned ${typeof action}`,
              );
              return empty();
          }
        }),
        scan<Action, State>(mergeReducerState(reducers), memoState),
        // TODO: make this available to be extended by the user
      )
      .subscribe(update);

    return () => {
      s.unsubscribe();
    };
  }, [reducers, memoState]);

  function selectState(callback: Function) {
    return callback(state);
  }

  return useMemo(() => ({ state, selectState }), [state, selectState]);
};

export const StoreContext = React.createContext<State>({});

const StoreProvider = ({
  store,
  children,
}: {
  store: Store;
  children: ReactNode;
}) => {
  const memoStore = useMemo(() => store, [store]);
  const stateProps = useStore(memoStore);
  const ui = typeof children === 'function' ? children(stateProps) : children;
  return <StoreContext.Provider value={stateProps}>{ui}</StoreContext.Provider>;
};

export const useSelector = (callback: Function) => {
  const { selectState } = React.useContext(StoreContext);
  const state = selectState(callback);
  return useMemo(() => state, [state]);
};

const generateInitialState = (
  reducers: Reducers | Function,
  initialState: State,
) => {
  if (typeof reducers === 'function') {
    // will accept single reducer function as well
    const reducerInitialState = reducers(undefined, {});
    return { ...initialState, ...reducerInitialState };
  }

  const stateFromReducers = Object.keys(reducers).reduce((acc, stateName) => {
    const stateReducer = reducers[stateName];
    return {
      ...acc,
      [stateName]: stateReducer(undefined, {}),
    };
  }, {});

  return { ...stateFromReducers, ...initialState };
};

export const createStore = (
  reducers: Reducers | Function,
  initialState: State = {},
) => {
  return {
    reducers,
    initialState: generateInitialState(reducers, cloneDeep(initialState)),
  };
};

export const ofType = (actionType: string) => {
  return filter(({ type }: SyncAction) => type === actionType);
};

export default StoreProvider;
