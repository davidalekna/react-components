import React, { useEffect, useState, ReactNode, useMemo, useRef } from 'react';
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

export const useStore = <T extends {} | []>({
  _stateUpdates,
  store$,
  reducers,
  initialState,
}: UseStoreProps<T>): { state: T; dispatch: (args: Action) => void } => {
  const initialMemoState = useMemo<T>(() => initialState, [initialState]);
  const [state, update] = useState<T>(initialMemoState);

  useEffect(() => {
    const s = _stateUpdates
      .pipe(
        mergeMap((action: Action) => {
          switch (typeof action) {
            // async actions
            case 'function': {
              const actionResult = action(_stateUpdates);
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
        scan<Action, T>(mergeReducerState(reducers), initialMemoState),
        // TODO: make this available to be extended by the user
      )
      .subscribe(store$);

    const b = store$.subscribe(update);

    return () => {
      s.unsubscribe();
      b.unsubscribe();
    };
  }, [reducers, initialMemoState]);

  const dispatch = (next: Action) => _stateUpdates.next(next);

  const selectState = (stateKey: string) => {
    return store$.pipe(
      distinctUntilKeyChanged(stateKey),
      pluck(stateKey),
    );
  };

  const stateChanges = () => store$.asObservable();

  return { state, dispatch };
};

export const StoreContext = React.createContext<State>({
  state: {},
  dispatch: () => {},
});

export const StoreProvider = <T extends {} | []>({
  store,
  children,
}: {
  store: Store<T>;
  children: ReactNode | Function;
}) => {
  const stateProps = useStore(store);
  const ui = typeof children === 'function' ? children(stateProps) : children;
  return <StoreContext.Provider value={stateProps}>{ui}</StoreContext.Provider>;
};

// todo: improve callback return type
export const useSelector = (callback: (args: State) => any) => {
  const { state } = React.useContext(StoreContext);
  const stateFromCallback = callback(state);
  return useMemo(() => stateFromCallback, [stateFromCallback]);
};

export const useDispatch = (): ((args: Action) => void) => {
  const { dispatch } = React.useContext(StoreContext);
  return useMemo(() => dispatch, [dispatch]);
};

export const createStore = <T extends {} | [] = {}>(
  reducers: Reducers | Function,
  initialState?: T,
): Store<T> => {
  const generatedState = generateInitialState(reducers, cloneDeep(initialState));
  return {
    _stateUpdates: new Subject(),
    store$: new BehaviorSubject(generatedState),
    reducers,
    initialState: generatedState,
  };
};

export function useAsyncReducer<T extends {} | [] = {}>(
  reducer: Reducers | Function,
  initialState?: T,
): [T, (args: Action) => void] {
  const storeConfig = useRef(createStore(reducer, initialState));
  const { state, dispatch } = useStore<T>(storeConfig.current);
  return [state, dispatch];
}
