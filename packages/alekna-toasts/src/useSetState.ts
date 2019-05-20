import { useReducer, useEffect, useRef } from 'react';

function useSetState<T>(initialState: T): [T, Function] {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialState,
  );

  return [state, setState];
}

export function useSafeSetState<T>(initialState?: T): [T, Function] {
  const [state, setState] = useSetState<T | undefined>(initialState);

  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => (mountedRef.current = false);
  });
  const setSafeState = (...args) => mountedRef.current && setState(...args);
  return [state, setSafeState];
}
