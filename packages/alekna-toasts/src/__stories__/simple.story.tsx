import React from 'react';
import { storiesOf } from '@storybook/react';
import { ToastProvider } from '../index';

const Demo = () => {
  return (
    <ToastProvider>
      {({ create }) => {
        return (
          <div>
            <button onClick={() => create('toast is showing!')}>
              create toast
            </button>
            <div>whats poppin</div>
          </div>
        );
      }}
    </ToastProvider>
  );
};

storiesOf('async validation', module).add('Demo', () => <Demo />);
