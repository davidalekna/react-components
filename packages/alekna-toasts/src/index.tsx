import React from 'react';
import uuid from 'uuid';
import { createPortal } from 'react-dom';
import { isClient } from './helpers';
import { State } from './types';
import useObservable from './useObservable';
import { createToast, dismissToast } from './store/actions';

export const ToastContext = React.createContext<State>({
  toasts: [],
});

const placements = {
  'top-left': { top: 0, left: 0 },
  'top-center': { top: 0, left: '50%', transform: 'translateX(-50%)' },
  'top-right': { top: 0, right: 0 },
  'bottom-left': { bottom: 0, left: 0 },
  'bottom-center': { bottom: 0, left: '50%', transform: 'translateX(-50%)' },
  'bottom-right': { bottom: 0, right: 0 },
};

const Toast = ({ id, jsx, onDismiss }) => {
  // React.useEffect(() => {
  //   const timer = setTimeout(() => onDismiss(id), 5000);
  //   return () => clearTimeout(timer);
  // }, [id]);

  return (
    <div
      style={{
        position: 'relative',
        background: 'green',
        width: 200,
        height: 100,
        marginTop: 10,
      }}
    >
      {jsx}
      <button onClick={() => onDismiss(id)}>clear</button>
    </div>
  );
};

const toastsPortal = toasts => {
  return createPortal(
    <div
      style={Object.assign({ position: 'absolute' }, placements['top-right'])}
    >
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>,
    document.body,
  );
};

export function ToastProvider({
  children,
  autoDismissTimeout = 5000,
  placement = 'bottom-center',
}) {
  // basic toasts idea is that we have a portal
  // and we control what goes in and out of the
  // portal with inner functions. We also give
  // a timeout for each toast.

  const { state, dispatch } = useObservable<State>({
    toasts: [],
  });

  const dismiss = (id: string) => {
    dispatch(dismissToast(id));
  };

  const create = (
    jsx: Node,
    props?: {
      appearance?: 'error' | 'info' | 'success';
      autoDismiss?: boolean;
    },
  ) => {
    dispatch(createToast({ id: uuid(), onDismiss: dismiss, jsx, ...props }));
  };

  // RENDERER BELLOW

  const fns = { create, dismiss };

  const ui =
    typeof children === 'function' ? children({ ...state, ...fns }) : children;

  return (
    <ToastContext.Provider value={{ ...state, ...fns }}>
      {ui}
      {isClient && toastsPortal(state.toasts)}
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
