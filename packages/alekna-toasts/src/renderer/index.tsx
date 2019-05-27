import React from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { State } from '../types';
import './styles.css';

const placements = {
  topLeft: {
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  topCenter: {
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
  },
  topRight: {
    top: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  bottomCenter: {
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column-reverse',
  },
};

export const createPortals = (
  state: State,
  components: { [key: string]: Node },
  style: { [key: string]: unknown },
  fns: { [key: string]: Function },
) => {
  return Object.keys(state).map(position => {
    if (Array.isArray(state[position]) && state[position].length) {
      return createPortal(
        <TransitionGroup
          style={Object.assign(
            {
              position: 'absolute',
              ...style,
            },
            placements[position],
          )}
        >
          {state[position].map(toast => {
            const Toast: any = components[position];
            return (
              <CSSTransition key={toast.id} timeout={500} classNames="toast">
                <Toast
                  onMouseEnter={() => fns.onMouseEnter(toast.id)}
                  onMouseLeave={() => fns.onMouseLeave(toast.id)}
                  {...toast}
                />
              </CSSTransition>
            );
          })}
        </TransitionGroup>,
        document.body,
      );
    }

    return null;
  });
};
