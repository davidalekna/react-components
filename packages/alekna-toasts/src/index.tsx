import React from 'react';
import uuid from 'uuid';
import { isClient } from './helpers';
import { State, Options } from './types';
import useObservable from './useObservable';
import { createToast, dismissToast, clearAll } from './store/actions';
import { createPortals } from './renderer';

export const ToastContext = React.createContext<State>({
  topLeft: [],
  topCenter: [],
  topRight: [],
  bottomLeft: [],
  bottomCenter: [],
  bottomRight: [],
});

export function ToastProvider({ children }) {
  const { state, dispatch } = useObservable<State>({
    topLeft: [],
    topCenter: [],
    topRight: [],
    bottomLeft: [],
    bottomCenter: [],
    bottomRight: [],
  });

  const dismiss = (id: string) => dispatch(dismissToast(id));

  const create = (jsx: Node, props: Options) => {
    dispatch(
      createToast({
        id: uuid(),
        onDismiss: dismiss,
        position: 'topRight',
        delay: 5000,
        jsx,
        ...props,
      }),
    );
  };

  const reset = () => dispatch(clearAll());

  // RENDERER BELLOW

  const fns = { create, dismiss, reset };

  const ui =
    typeof children === 'function' ? children({ ...state, ...fns }) : children;

  return (
    <ToastContext.Provider value={{ ...state, ...fns }}>
      {ui}
      {isClient && createPortals(state)}
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error(
      `Toast compound components cannot be rendered outside the Toast component`,
    );
  }
  return context;
}
