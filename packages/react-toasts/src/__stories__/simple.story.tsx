import React from 'react';
import { storiesOf } from '@storybook/react';
import { ToastsProvider } from '../index';

const Button = ({ create, position }) => {
  return (
    <button
      onClick={() =>
        create(
          `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis, consequatur?`,
          {
            position,
          },
        )
      }
      style={{ padding: 10, margin: 10 }}
    >
      create {position}
    </button>
  );
};

const Demo = () => {
  return (
    <ToastsProvider>
      {({ create, reset }) => {
        return (
          <div
            style={{
              display: 'flex',
              flex: '0 0 auto',
              flexDirection: 'column',
              width: 300,
            }}
          >
            <Button create={create} position="topLeft" />
            <Button create={create} position="topCenter" />
            <Button create={create} position="topRight" />
            <Button create={create} position="bottomLeft" />
            <Button create={create} position="bottomCenter" />
            <Button create={create} position="bottomRight" />
            <button onClick={reset}>reset all</button>
            <div>whats poppin</div>
          </div>
        );
      }}
    </ToastsProvider>
  );
};

storiesOf('async validation', module).add('Demo', () => <Demo />);
