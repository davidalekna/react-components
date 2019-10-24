import React from 'react';
import { storiesOf } from '@storybook/react';
import { useAsyncReducer } from '../src/index';
import { interval } from 'rxjs';
import { map, take, startWith } from 'rxjs/operators';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const Demo = () => {
  const [state, dispatch] = useAsyncReducer(reducer);
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 48 }}>Count: {state.count}</div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            style={{ padding: '10px 20px', fontSize: 24 }}
            onClick={() =>
              dispatch(async () => {
                await sleep(500);
                return { type: 'increment' };
              })
            }
          >
            +
          </button>
          <button
            style={{ padding: '10px 20px', fontSize: 24 }}
            onClick={() => dispatch({ type: 'decrement' })}
          >
            -
          </button>
          <button
            style={{ padding: '10px 20px', fontSize: 24 }}
            onClick={() =>
              dispatch(() =>
                interval(1000).pipe(
                  startWith(0),
                  take(5),
                  map(() => ({
                    type: 'increment',
                  })),
                ),
              )
            }
          >
            auto click
          </button>
        </div>
      </div>
    </div>
  );
};

storiesOf('useAsyncReducer', module).add('Demo', () => <Demo />);
