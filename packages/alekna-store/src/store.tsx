import React, { useContext } from 'react';
import { useEffect, useState, ReactNode, useMemo, useRef, useCallback } from 'react';
import { Subject, of, empty, isObservable, from, BehaviorSubject } from 'rxjs';
import { scan, mergeMap, pluck, distinctUntilKeyChanged } from 'rxjs/operators';
import { cloneDeep } from 'lodash';
import { Reducers, State, Store, Action } from './types';
import { mergeReducerState, generateInitialState } from './utils';

type UseStoreProps<T> = {
  _stateUpdates: Subject<Action>;
  store$: BehaviorSubject<any>;
  reducers: Reducers | Function;
  initialState?: T;
};

type UseStoreReturns<T> = {
  dispatch: (args: Action) => void;
  selectState: Function;
  stateChanges: Function;
  initialState: T;
};

export const useStore = <T extends {} | []>({
  _stateUpdates,
  store$,
  reducers,
  initialState,
}: UseStoreProps<T>): UseStoreReturns<T> => {
  const initialStateM = useMemo<T>(() => initialState, [initialState]);

  useEffect(() => {
    const s = _stateUpdates
      .pipe(
        mergeMap((action: Action) => {
          switch (typeof action) {
            /** async actions */
            case 'function': {
              const actionResult = action(_stateUpdates);
              if (isObservable(actionResult)) {
                return actionResult;
              } else {
                return from(Promise.resolve(actionResult));
              }
            }
            /** sync actions */
            case 'object': {
              return of(action);
            }
            /** wrong type */
            default: {
              console.error(
                `Action must return a function or an object, your one has returned ${typeof action}`,
              );
              return empty();
            }
          }
        }),
        scan<Action, T>(mergeReducerState(reducers), initialStateM),
      )
      .subscribe(store$);

    return () => {
      s.unsubscribe();
    };
  }, [reducers, initialStateM]);

  const dispatch = (next: Action) => _stateUpdates.next(next);

  const selectState = (stateKey: string) => {
    if (!stateKey.length) return store$;
    return store$.pipe(distinctUntilKeyChanged(stateKey), pluck(stateKey));
  };

  const stateChanges = () => store$.asObservable();

  return { dispatch, selectState, stateChanges, initialState: initialStateM };
};

export const StoreContext = React.createContext<State>({
  dispatch: () => {},
  selectState: () => {},
  stateChanges: () => {},
});

export const StoreProvider = <T extends {} | []>({
  store,
  children,
}: {
  store: Store<T>;
  children: ReactNode | Function;
}) => {
  const storeUtils = useStore(store);
  const ui = typeof children === 'function' ? children(storeUtils) : children;
  return <StoreContext.Provider value={storeUtils}>{ui}</StoreContext.Provider>;
};

export function useStoreContext() {
  const storeUtils = useContext(StoreContext);
  if (!storeUtils) {
    throw new Error(
      `Store compound components cannot be rendered outside the Form component`,
    );
  }
  return storeUtils;
}

/**
 * React Hook for using full state in a nested component
 * within the StoreProvider. It has no optimizations so
 * all tree will be re-rendered on state updates.
 */
export const useStoreState = <T extends any>(): [T, Function] => {
  const { stateChanges, dispatch, initialState } = useStoreContext();
  const [state, setState] = useState<T>(initialState);

  useEffect(() => {
    const s = stateChanges().subscribe(setState);
    return () => s.unsubscribe();
  }, [state, setState]);

  return [state, dispatch];
};

/**
 * React Hook for pre-selecting single state and watching it. Optimized for
 * re-renders only when selected state updates.
 */
export const useSelector = (stateName: string, initialState: unknown = undefined) => {
  const { selectState } = useStoreContext();
  const [state, update] = useState(initialState);

  useEffect(() => {
    const s = selectState(stateName).subscribe(update);
    return () => {
      s.unsubscribe();
    };
  }, [state, update, stateName]);

  return state;
};

/**
 * React Hook dispatch event for dispatching actions into
 * Subjects
 */
export const useDispatch = (): ((args: Action) => void) => {
  const { dispatch } = useStoreContext();
  return useCallback(() => dispatch, [dispatch]);
};

export const createStore = <T extends {} | [] = {}>(
  reducers: Reducers | Function,
  initialState?: T,
): Store<T> => {
  const processedState = generateInitialState(reducers, cloneDeep(initialState));
  return {
    _stateUpdates: new Subject(),
    store$: new BehaviorSubject(processedState),
    reducers,
    initialState: processedState,
  };
};

type UseAsyncReducerReturns<T> = [T, (args: Action) => void];

export function useAsyncReducer<T>(
  reducer: (state: any, action: any) => T | Reducers,
  initialState?: T,
): UseAsyncReducerReturns<T> {
  const storeConfig = useRef(createStore(reducer, initialState));
  const [state, update] = useState(storeConfig.current.initialState);
  const { dispatch, stateChanges } = useStore<T>(storeConfig.current);

  useEffect(() => {
    const s = stateChanges().subscribe(update);
    return () => {
      s.unsubscribe();
    };
  }, [state, update]);

  return [state, dispatch];
}
