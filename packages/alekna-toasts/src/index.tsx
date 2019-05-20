import React from 'react';

export const ToastContext = React.createContext<{}>({});

export function Toast({ children }) {
  const [state, setState] = React.useState();

  const fns = {};

  const ui =
    typeof children === 'function' ? children({ state, ...fns }) : children;

  return (
    <ToastContext.Provider value={{ state, ...fns }}>
      {ui}
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

export function ToastProvider({ children, ...props }) {
  const context = useToastContext();
  return children({ ...context, ...props });
}
