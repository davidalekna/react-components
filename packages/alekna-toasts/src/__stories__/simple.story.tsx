import React from 'react';
import { storiesOf } from '@storybook/react';
import { ToastProvider } from '../index';
import uuid from 'uuid';

const Demo = () => {
  return (
    <ToastProvider>
      {({ create }) => {
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
            <div>whats poppin</div>
          </div>
        );
      }}
    </ToastProvider>
  );
};

storiesOf('async validation', module).add('Demo', () => <Demo />);
