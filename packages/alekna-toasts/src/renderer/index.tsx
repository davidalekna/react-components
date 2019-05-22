import React from 'react';
import { createPortal } from 'react-dom';
import { State } from '../types';

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

export const createPortals = (state: State) => {
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
