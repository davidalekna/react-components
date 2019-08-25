import React, { useEffect, useState, ReactNode, useMemo } from 'react';
import { Subject, merge } from 'rxjs';
import { scan, filter, tap, share, shareReplay } from 'rxjs/operators';
import { merge as lodashMerge, cloneDeep } from 'lodash';
import { Reducers, State, Store, Action } from './types';
import combineEpics from './combineEpics';

/////////////////
// http://rudiyardley.com/redux-single-line-of-code-rxjs/
// NEW APPROACH TO TRY
// const state = new Subject()
// const state$ = state.pipe(
//   startWith({initial: 'state'})
// )
// actions$.pipe(
//   withLatestFrom(state$, reducer)
// ).subscribe(state)
// state$.subscribe(renderer);

/////////////////

type StoreProps = {
  reducers: Reducers | Function;
  epics?: any[];
  initialState?: State;
};

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
    lodashMerge(newState, {
      [key]: reducer(prevState[key], action),
    });
  }
  // merge prevState with current state
  return { ...prevState, ...newState };
};

export const useStore = ({
  reducers,
  epics = [],
  initialState = {},
}: StoreProps) => {
  const [state, update] = useState(initialState);

  useEffect(() => {
    // const combinedEpics = combineEpics(epics);
    const s = merge(actions$, ...epics.map(epic => epic(actions$)))
      .pipe(
        tap(action => console.log(action)),
        scan<Action, State>(mergeReducerState(reducers), initialState),
      )
      .subscribe(update);

    return () => {
      s.unsubscribe();
    };
  }, [reducers, initialState, epics]);

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
  epics: Function[] = [],
  initialState: State = {},
) => {
  return {
    reducers,
    epics,
    initialState: generateInitialState(reducers, cloneDeep(initialState)),
  };
};

export const ofType = (actionType: string) => {
  return filter(({ type }: Action) => type === actionType);
};

export default StoreProvider;
