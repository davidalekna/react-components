import React, {
  useContext,
  useLayoutEffect,
  useEffect,
  useState,
  ReactNode,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import { Subject, of, empty, isObservable, from, BehaviorSubject, Observable } from 'rxjs';
import { scan, mergeMap, pluck, distinctUntilKeyChanged } from 'rxjs/operators';
import { cloneDeep } from 'lodash';
import { Reducers, StoreState, Action } from './types';
import { mergeReducerState, generateInitialState } from './utils';

const actionDistributor = (_stateUpdates: Subject<Action>) => (action: Action) => {
  switch (typeof action) {
    /** async actions */
    case 'function': {
      if (Array.isArray(action)) {
        throw Error('Actions accepts object, function or observable only.');
      }

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
};

export const StoreContext = React.createContext<StoreState<any> | undefined>({
  dispatch: () => {},
  selectState: () => {},
  stateChanges: () => {},
  initialState: {},
});

type StoreProps<T> = {
  _stateUpdates: Subject<Action>;
  store$: BehaviorSubject<any>;
  reducers: Reducers | Function;
  initialState?: T;
};

type StoreReturnProps<T> = {
  dispatch: (args: Action) => void;
  selectState: Function;
  stateChanges: Function;
  initialState: T;
};

const useStore = <T extends any>({
  _stateUpdates,
  store$,
  reducers,
  initialState: is,
}: StoreProps<T>): StoreReturnProps<T> => {
  const initialState = useMemo<T>(() => is, [is]);

  useLayoutEffect(() => {
    const s = _stateUpdates
      .pipe(
        mergeMap(actionDistributor(_stateUpdates)),
        scan<Action, T>(mergeReducerState(reducers), initialState),
      )
      .subscribe(store$);

    return () => {
      s.unsubscribe();
    };
  }, [reducers, initialState]);

  const dispatch = (action: Action) => {
    // console.log('dispatch');
    _stateUpdates.next(action);
  };

  const selectState = (stateKey: string) => {
    // TODO: if no stateKey throw an Error.
    if (!stateKey.length) return store$;
    return store$.pipe(distinctUntilKeyChanged(stateKey), pluck(stateKey));
  };

  const stateChanges = () => store$.asObservable();

  return { dispatch, selectState, stateChanges, initialState };
};

type StoreProviderProps<T> = {
  store: StoreProps<T>;
  children: ReactNode | Function;
};

export const StoreProvider = <T extends {} | []>({ store, children }: StoreProviderProps<T>) => {
  const storeUtils = useStore(store);
  const ui = typeof children === 'function' ? children(storeUtils) : children;
  return <StoreContext.Provider value={storeUtils}>{ui}</StoreContext.Provider>;
};

export function useStoreContext(): StoreState<{}> {
  const storeUtils = useContext(StoreContext);
  if (!storeUtils) {
    throw new Error(
      `Store compound components cannot be rendered outside the StoreProvider component`,
    );
  }
  return storeUtils;
}

/**
 * React Hook for using full state in a nested component
 * within the StoreProvider. It has no optimizations so
 * all tree will be re-rendered on state updates.
 *
 * useSelector should be used for appropriate components in optimization favour
 */
export const useStoreState = (
  pipe: <T>(selectedStore$: Observable<T>) => Observable<T> = str => str,
): [any, Function] => {
  const { stateChanges, dispatch, initialState } = useStoreContext();
  const [state, setState] = useState(initialState);
  const extend = useRef(pipe).current;

  useEffect(() => {
    const s = stateChanges()
      .pipe(extend)
      .subscribe(setState);
    return () => s.unsubscribe();
  }, [state, setState, extend]);

  return [state, dispatch];
};

/**
 * React Hook for pre-selecting single state and watching it. Optimized for
 * re-renders on state updates and can be extended.
 */
export const useSelector = <K extends any>(
  stateName: string,
  extend: <T>(selectedStore$: Observable<T>) => Observable<T> = str => str,
) => {
  const { selectState, stateChanges, initialState: oldInitial } = useStoreContext();
  // NOTE: grabbing initialState from observable source without subscribing to it.
  // not sure if there are any caveats to this approach?
  const initialState = stateChanges()?.source?.value || oldInitial;
  const initialize = useMemo<K>(() => initialState[stateName], [initialState, stateName]);
  const [state, update] = useState(initialize);
  const pipe = useRef(extend).current;

  useEffect(() => {
    const stream = selectState(stateName)
      .pipe(pipe)
      .subscribe(update);

    return () => {
      stream.unsubscribe();
    };
  }, [stateName, selectState, update, pipe]);

  return state;
};

/**
 * React Hook dispatch event for dispatching actions into
 * Subjects
 */
export const useDispatch = () => {
  const { dispatch } = useStoreContext();
  return useCallback(dispatch, [dispatch]);
};

export const createStore = <T extends {} | [] = {}>(
  reducers: Reducers | Function,
  initialState?: T,
): StoreProps<T> => {
  const processedState = generateInitialState(reducers, cloneDeep(initialState));
  return {
    _stateUpdates: new Subject(),
    store$: new BehaviorSubject(processedState),
    reducers,
    initialState: processedState,
  };
};

export function useAsyncReducer<T>(
  reducer: Reducers | Function,
  initialState?: T,
): [T, (args: Action) => void] {
  const storeConfig = useRef(createStore(reducer, initialState)).current;
  const [state, update] = useState(storeConfig.initialState);
  const { dispatch, stateChanges } = useStore<T>(storeConfig);

  useEffect(() => {
    const s = stateChanges().subscribe(update);
    return () => {
      s.unsubscribe();
    };
  }, [state, update]);

  return [state, dispatch];
}
