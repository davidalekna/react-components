import { renderHook } from '@testing-library/react-hooks';
import { StoreProvider, createStore, useSelector } from '../store';

const provider = ({ reducers, initialState, children }: any) => {
  return <StoreProvider store={createStore(reducers, initialState)}>{children}</StoreProvider>;
};

export function useSelectorSetup({ props, reducers, initialState }: any = {}) {
  const renderArg = renderHook(useSelector, {
    initialProps: props,
    wrapper: ({ children }) => {
      return provider({
        reducers,
        initialState,
        children,
      });
    },
  });

  return renderArg;
}

// TODO
