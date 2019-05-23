import React from 'react';
import uuid from 'uuid';
import useObservable from './useObservable';
import { isClient } from './helpers';
import { State, Options } from './types';
import { createToast, dismissToast, clearAll } from './store/actions';
import { createPortals } from './renderer';
import DefaultToast from './renderer/toast';

export { DefaultToast as ToastContainer };

export const ToastContext = React.createContext<State>({
  topLeft: [],
  topCenter: [],
  topRight: [],
  bottomLeft: [],
  bottomCenter: [],
  bottomRight: [],
});

// Disable auto-close 😋
// Hide progress bar(less fanciness!)
// Newest on top*
// Close on click 😋
// Pause delay on hover
// Allow to drag and close the toast

export function ToastsProvider({ children, Toast = DefaultToast }) {
  const { state, dispatch } = useObservable<State>({
    topLeft: [],
    topCenter: [],
    topRight: [],
    bottomLeft: [],
    bottomCenter: [],
    bottomRight: [],
  });

  const dismiss = (id: string) => dispatch(dismissToast(id));

  const create = (jsx: Node, overrides: Options) => {
    dispatch(
      createToast({
        id: uuid(),
        dismiss,
        position: 'topRight',
        delay: 5000,
        autoClose: true,
        jsx,
        ...overrides,
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
      {isClient && createPortals(state, Toast)}
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
