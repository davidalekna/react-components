import React from 'react';
import uuid from 'uuid';
import useObservable from './useObservable';
import DefaultToast from './renderer/toast';
import { isClient } from './helpers';
import { State, Options } from './types';
import { createPortals } from './renderer';
import {
  createToast,
  dismissToast,
  clearAll,
  mouseEnter,
  mouseLeave,
} from './store/actions';

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

export function ToastsProvider({
  children,
  components = {
    topLeft: DefaultToast,
    topCenter: DefaultToast,
    topRight: DefaultToast,
    bottomLeft: DefaultToast,
    bottomCenter: DefaultToast,
    bottomRight: DefaultToast,
  },
}) {
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
        delay: 20000,
        autoClose: true,
        jsx,
        ...overrides,
      }),
    );
  };

  const reset = () => dispatch(clearAll());

  const onMouseEnter = (id: string) => dispatch(mouseEnter(id));
  const onMouseLeave = (id: string) => dispatch(mouseLeave(id));

  // RENDERER BELLOW

  const fns = { create, dismiss, reset };

  const ui =
    typeof children === 'function' ? children({ ...state, ...fns }) : children;

  return (
    <ToastContext.Provider value={{ ...state, ...fns }}>
      {ui}
      {isClient &&
        createPortals(state, components, { onMouseEnter, onMouseLeave })}
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
