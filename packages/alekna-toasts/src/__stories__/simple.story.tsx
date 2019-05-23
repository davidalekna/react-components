import React from 'react';
import { storiesOf } from '@storybook/react';
import { ToastsProvider } from '../index';
import uuid from 'uuid';

const Demo = () => {
  return (
    <ToastsProvider>
      {({ create, reset }) => {
        return (
          <div>
            <button
              onClick={() =>
                create(`toast is showing! ${uuid()}`, {
                  position: 'topRight',
                })
              }
            >
              create topRight
            </button>
            <button
              onClick={() =>
                create(`toast is showing! ${uuid()}`, {
                  position: 'bottomRight',
                })
              }
            >
              create topRight
            </button>
            <button onClick={reset}>reset all</button>
            <div>whats poppin</div>
          </div>
        );
      }}
    </ToastsProvider>
  );
};

storiesOf('async validation', module).add('Demo', () => <Demo />);
