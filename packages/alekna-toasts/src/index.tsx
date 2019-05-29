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
// Pause delay on hover 😋

const toastComponents = {
  topLeft: DefaultToast,
  topCenter: DefaultToast,
  topRight: DefaultToast,
  bottomLeft: DefaultToast,
  bottomCenter: DefaultToast,
  bottomRight: DefaultToast,
};

export function ToastsProvider({
  children,
  components = {},
  style = {
    padding: 10,
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

  const onMouseEnter = (id: string) => dispatch(mouseEnter(id));
  const onMouseLeave = (id: string) => dispatch(mouseLeave(id));
  const dismiss = (id: string) => dispatch(dismissToast(id));
  const reset = () => dispatch(clearAll());

  const create = (jsx: Node, overrides: Options) => {
    const toastId = uuid();
    dispatch(
      createToast({
        id: toastId,
        onClick: () => dismiss(toastId),
        onMouseEnter: () => onMouseEnter(toastId),
        onMouseLeave: () => onMouseLeave(toastId),
        position: 'topRight',
        delay: 5000,
        autoClose: true,
        jsx,
        ...overrides,
      }),
    );
  };

  // RENDERER BELLOW

  const mergedComponents: any = Object.assign(toastComponents, components);
  const fns = { create, dismiss, reset };

  const ui =
    typeof children === 'function' ? children({ ...state, ...fns }) : children;

  return (
    <ToastContext.Provider value={{ ...state, ...fns }}>
      {ui}
      {isClient && createPortals(state, mergedComponents, style)}
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
