import React from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Container } from './animations';
import { State, Positions } from '../types';
import placements from './placements';

export const createPortals = (
  state: State,
  components: Positions,
  style: { [key: string]: unknown },
) => {
  return Object.keys(state).map(position => {
    if (Array.isArray(state[position]) && state[position].length) {
      return createPortal(
        <Container>
          <TransitionGroup
            style={Object.assign(
              {
                position: 'absolute',
                ...style,
              },
              placements[position],
            )}
          >
            {state[position].map(({ autoClose, ...toast }) => {
              const Toast = components[position];
              return (
                <CSSTransition key={toast.id} timeout={500} classNames="toast">
                  <Toast {...toast} />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </Container>,
        document.body,
      );
    }

    return null;
  });
};
