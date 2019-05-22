import React from 'react';
import uuid from 'uuid';
import { createPortal } from 'react-dom';
import { isClient } from './helpers';
import { State, Placement, Options } from './types';
import useObservable from './useObservable';
import { createToast, dismissToast } from './store/actions';

export const ToastContext = React.createContext<State>({
  topLeft: [],
  topCenter: [],
  topRight: [],
  bottomLeft: [],
  bottomCenter: [],
  bottomRight: [],
});

const placements = {
  topLeft: { top: 0, left: 0 },
  topCenter: { top: 0, left: '50%', transform: 'translateX(-50%)' },
  topRight: { top: 0, right: 0 },
  bottomLeft: { bottom: 0, left: 0 },
  bottomCenter: { bottom: 0, left: '50%', transform: 'translateX(-50%)' },
  bottomRight: { bottom: 0, right: 0 },
};

const Toast = ({ id, jsx, onDismiss }) => {
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

// const toastsPortal = toasts => {
//   // TODO: portal should hold position style
//   // position will be provided when creating toast
//   return createPortal(
//     <div
//       style={Object.assign({ position: 'absolute' }, placements['topRight'])}
//     >
//       {toasts.map(toast => (
//         <Toast key={toast.id} {...toast} />
//       ))}
//     </div>,
//     document.body,
//   );
// };

const createPortals = (state: State) => {
  return Object.keys(state).map(position => {
    if (Array.isArray(state[position]) && state[position].length) {
      return createPortal(
        <div
          style={Object.assign({ position: 'absolute' }, placements[position])}
        >
          {state[position].map(toast => (
            <Toast key={toast.id} {...toast} />
          ))}
        </div>,
        document.body,
      );
    }

    return null;
  });
};

export function ToastProvider({ children, autoDismissTimeout = 5000 }) {
  const { state, dispatch } = useObservable<State>({
    topLeft: [],
    topCenter: [],
    topRight: [],
    bottomLeft: [],
    bottomCenter: [],
    bottomRight: [],
  });

  const dismiss = (id: string) => dispatch(dismissToast(id));

  const create = (
    jsx: Node,
    props: Options = {
      position: 'topRight',
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
