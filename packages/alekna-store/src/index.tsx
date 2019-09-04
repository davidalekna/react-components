import React, { useEffect, useState, ReactNode, useMemo, useRef } from 'react';
import { Subject, of, empty, isObservable, from } from 'rxjs';
import { scan, mergeMap, filter } from 'rxjs/operators';
import { merge, cloneDeep } from 'lodash';
import { Reducers, State, Store, Action, SyncAction } from './types';

function rootReducerAsFunction(
  reducer: Function,
  state: {} = {},
  action: Action | {},
) {
  const newState = reducer(state, action);
  return { ...state, ...newState };
  // throw new Error('Initial reducer must be an object');
}

const mergeReducerState = reducers => (prevState, action) => {
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

export const useStore = <T extends object | []>({
  actions$,
  reducers,
  initialState,
}: {
  actions$: any;
  reducers: Reducers | Function;
  initialState?: T;
}) => {
  const memoState = useMemo(() => initialState, [initialState]);
  const [state, update] = useState<T>(memoState);

  useEffect(() => {
    const s = actions$
      .pipe(
        mergeMap((action: Action) => {
          switch (typeof action) {
            // async actions
            case 'function': {
              const actionResult = action(actions$);
              if (isObservable(actionResult)) {
                return actionResult;
              } else {
                return from(Promise.resolve(actionResult));
              }
            }
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

  const dispatch = (next: Action) => actions$.next(next);

  return { state, selectState, dispatch };
};

export const StoreContext = React.createContext<State>({});

const StoreProvider = ({
  store,
  children,
}: {
  store: Store;
  children: ReactNode;
}) => {
  const stateProps = useStore(store);
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
  initialState: State = {},
) => {
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

export const createStore = (
  reducers: Reducers | Function,
  initialState: State = {},
) => {
  const actions$ = new Subject();
  return {
    actions$,
    reducers,
    initialState: generateInitialState(reducers, cloneDeep(initialState)),
  };
};

export const ofType = (actionType: string) => {
  return filter(({ type }: SyncAction) => type === actionType);
};

export function useAsyncReducer<T extends object | []>(
  reducer: Function,
  initialState = {},
) {
  const storeConfig = useRef(createStore(reducer, initialState));
  const { state, dispatch } = useStore<T>(storeConfig.current);
  return [state, dispatch];
}

export default StoreProvider;
