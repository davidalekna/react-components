import React, { createContext, useContext } from 'react';
import { useStore, createStore } from '@alekna/react-store';
import DefaultToast from './renderer/toast';
import { isClient } from './helpers';
import { State, Config } from './types';
import { createPortals } from './renderer';
import {
  createToast,
  dismissToast,
  clearAll,
  mouseEnter,
  mouseLeave,
} from './store/actions';
import { generateId } from './store/helpers';
import reducer, { initialState } from './store/reducer';

export { DefaultToast as ToastContainer };

export const ToastContext = createContext<State>(initialState);

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

const storeConfig = createStore({
  toasts: reducer,
});

export function ToastsProvider({
  children,
  components = {},
  style = {
    padding: 10,
  },
}) {
  const { state, dispatch } = useStore(storeConfig);

  const onMouseEnter = (id: string) => dispatch(mouseEnter(id));
  const onMouseLeave = (id: string) => dispatch(mouseLeave(id));
  const dismiss = (id: string) => dispatch(dismissToast(id));
  const reset = () => dispatch(clearAll());

  const create = (jsx: JSX.Element, config: Config) => {
    const toastId = generateId();
    const initialDelay = config.delay || 5000;
    dispatch(
      createToast({
        id: toastId,
        onClick: () => dismiss(toastId),
        onMouseEnter: () => onMouseEnter(toastId),
        onMouseLeave: () => onMouseLeave(toastId),
        position: 'topRight',
        progress: initialDelay / 1000,
        autoClose: true,
        paused: false,
        delay: initialDelay,
        jsx,
        ...config,
      }),
    );
  };

  // RENDERER BELLOW

  const mergedComponents: any = Object.assign(toastComponents, components);
  const fns = { create, dismiss, reset };

  const ui =
    typeof children === 'function'
      ? children({ ...state.toasts, ...fns })
      : children;

  return (
    <ToastContext.Provider value={{ ...state.toasts, ...fns }}>
      {ui}
      {isClient && createPortals(state.toasts, mergedComponents, style)}
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(
      `Toast compound components cannot be rendered outside the Toast component`,
    );
  }
  return context;
}
