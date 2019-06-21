import React, { useEffect, useState, ReactNode, useMemo } from 'react';
import { Subject } from 'rxjs';
import { scan, filter } from 'rxjs/operators';
import { merge as lodashMerge } from 'lodash';
import { Reducers, State, Store, Epics, Action } from './types';
import combineEpics from './combineEpics';

const action$ = new Subject();

export const dispatch = (next: Action) => action$.next(next);

export const useStore = (
  reducers: Reducers | Function,
  epics: Epics = [],
  initialState: State = {},
) => {
  const [state, update] = useState(initialState);

  useEffect(() => {
    const combinedEpics = combineEpics(epics);
    const s = combinedEpics(action$)
      .pipe(
        scan<Action, State>((prevState, action) => {
          if (typeof reducers === 'function') {
            // will accept single reducer function as well
            const newState = reducers(prevState, action);
            return { ...prevState, ...newState };
          }

          // get all keys of state
          const stateKeys = Object.keys(reducers);
          const newState = {};
          // loop over all state keys
          for (const key of stateKeys) {
            // extract reducer for per state key
            const reducer = reducers[key];
            lodashMerge(newState, {
              [key]: reducer(prevState[key], action),
            });
          }
          // merge prevState with current state
          return lodashMerge(prevState, newState);
        }, initialState),
      )
      .subscribe(update);

    return () => {
      s.unsubscribe();
    };
  }, [reducers, initialState, epics]);

  function selectState(callback: Function) {
    return callback(state);
  }

  return { state, selectState };
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
  const stateProps = useStore(
    memoStore.reducers,
    memoStore.epics,
    memoStore.initialState,
  );
  const ui = typeof children === 'function' ? children(stateProps) : children;
  return <StoreContext.Provider value={stateProps}>{ui}</StoreContext.Provider>;
};

export const useSelector = (callback: Function) => {
  const { selectState } = React.useContext(StoreContext);
  const state = selectState(callback);
  return useMemo(() => state, [state]);
};

const getInitialState = (
  reducers: Reducers | Function,
  initialState: State,
) => {
  if (typeof reducers === 'function') {
    // will accept single reducer function as well
    const reducerInitialState = reducers(undefined, {});
    return { ...initialState, ...reducerInitialState };
  }

  const stateFromReducers = Object.keys(reducers).reduce((acc, key) => {
    const reducer = reducers[key];
    return {
      ...acc,
      [key]: reducer(undefined, {}),
    };
  }, {});

  return lodashMerge(stateFromReducers, initialState);
};

export const createStore = (
  reducers: Reducers | Function,
  epics: Epics = [],
  initialState: State = {},
) => {
  return {
    reducers,
    epics,
    initialState: getInitialState(reducers, initialState),
  };
};

export const ofType = (actionType: string) => {
  return filter(({ type }: any) => type === actionType);
};

export default StoreProvider;
