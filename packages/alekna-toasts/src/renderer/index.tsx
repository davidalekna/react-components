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

export const createPortals = (state: State, components: any, fns) => {
  return Object.keys(state).map(position => {
    if (Array.isArray(state[position]) && state[position].length) {
      return createPortal(
        <div
          style={Object.assign(
            { position: 'absolute', padding: 10, border: '1px dashed black' },
            placements[position],
          )}
        >
          {state[position].map(toast => {
            const Toast = components[position];
            return (
              <Toast
                key={toast.id}
                onMouseEnter={() => fns.onMouseEnter(toast.id)}
                onMouseLeave={() => fns.onMouseLeave(toast.id)}
                {...toast}
              />
            );
          })}
        </div>,
        document.body,
      );
    }

    return null;
  });
};
