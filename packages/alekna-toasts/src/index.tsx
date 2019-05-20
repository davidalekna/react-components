import React from 'react';
import { createPortal } from 'react-dom';
import { isClient } from './helpers';
import { useSafeSetState } from './useSetState';
import { State } from './types';

export const ToastContext = React.createContext<State>({
  toasts: [],
});

const portal = toasts => {
  return createPortal(
    <div>
      {toasts.map(({ content, id, onDismiss, ...rest }) => (
        <div key={id} {...rest}>
          {content}
        </div>
      ))}
    </div>,
    document.body,
  );
};

export function ToastProvider({
  children,
  autoDismissTimeout = 6000,
  placement = 'bottom-center',
}) {
  const [state, setState] = useSafeSetState<State>({
    toasts: [],
  });

  const create = (jsx, toastProps) => {
    // add toast
  };

  const clear = id => {
    // removes toast
  };

  // RENDERER BELLOW

  const fns = { create, clear };

  const ui =
    typeof children === 'function' ? children({ ...state, ...fns }) : children;

  return (
    <ToastContext.Provider value={{ ...state, ...fns }}>
      {ui}
      {isClient && portal(state.toasts)}
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
