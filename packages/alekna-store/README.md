<div align="center">
<h1>@alekna/react-store</h1>

<p>async redux type store for react with rxjs touch.</p>

<p style="text-align: center;">

[![size][size-badge]][unpkg-lib]
[![gzip size][gzip-badge]][unpkg-lib]

</p>
</div>
<hr />

<pre>npm i <a href="https://www.npmjs.com/package/@alekna/react-store">@alekna/react-store</a></pre>

## Usage

> [Example](https://codesandbox.io/s/aleknareact-store-hooks-8fgiw)

### useAsyncReducer

> [Try it out in the browser](https://codesandbox.io/s/determined-borg-l7egr)

Works just like react useReducer, but dispatcher can also handle promises and observables

```jsx
import React from 'react';
import { render } from 'react-dom';
import { interval } from 'rxjs';
import { map, take, startWith } from 'rxjs/operators';
import { useAsyncReducer } from '@alekna/react-store';

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

const App = () => {
  const [state, dispatch] = useAsyncReducer(reducer);
  return (
    <>
      <div>Count: {state.count}</div>
      <div>
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
            dispatch(() => {
              return interval(1000).pipe(
                startWith(0),
                take(5),
                map(() => ({
                  type: 'increment',
                })),
              );
            })
          }
        >
          auto click
        </button>
      </div>
    </>
  );
};

render(<App />, document.getElementById('root'));
```

### Usage with hooks api

> [Try it out in the browser](https://codesandbox.io/s/aleknareact-store-hooks-754lm)

```jsx
import React from 'react';
import { render } from 'react-dom';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { useStore, createStore } from '@alekna/react-store';

const onChange = text => () => {
  return of({
    type: 'onChange',
    payload: text,
  }).pipe(delay(1000));
};

function reducer(state = { text: '' }, action) {
  switch (action.type) {
    case 'onChange':
      return {
        ...state,
        text: state.text.concat(action.payload.slice(-1)),
      };
    default:
      return state;
  }
}
const storeConfig = createStore(reducer);

function App() {
  const { state, dispatch } = useStore(storeConfig);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>Start typing bellow</h1>
      <input
        value={state.text}
        placeholder="your input will be delayed by 1sec"
        onChange={evt => dispatch(onChange(evt.target.value))}
      />
    </div>
  );
}

render(<App />, document.getElementById('root'));
```

### Usage with render props and context api

> [Try it out in the browser](https://codesandbox.io/s/aleknareact-store-render-props-3dfcm)

```jsx
import React from 'react';
import { render } from 'react-dom';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import StoreProvider, { createStore, useSelector } from '@alekna/react-store';

const onChange = text => () => {
  return of({
    type: 'onChange',
    payload: text,
  }).pipe(delay(1000));
};

function reducer(state = { text: '' }, action) {
  switch (action.type) {
    case 'onChange':
      return {
        ...state,
        text: state.text.concat(action.payload.slice(-1)),
      };
    default:
      return state;
  }
}
const storeConfig = createStore(reducer);

function App() {
  return (
    <StoreProvider store={storeConfig}>
      {({ dispatch }) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1>Start typing bellow</h1>
          <Input dispatch={dispatch} />
        </div>
      )}
    </StoreProvider>
  );
}

function Input({ dispatch }) {
  const text = useSelector(state => state.text);
  return (
    <input
      value={text}
      placeholder="your input will be delayed by 1sec"
      onChange={evt => dispatch(onChange(evt.target.value))}
    />
  );
}

render(<App />, document.getElementById('root'));
```

[gzip-badge]: http://img.badgesize.io/https://unpkg.com/downshift/dist/downshift.umd.min.js?compression=gzip&label=gzip%20size&style=flat-square
[size-badge]: http://img.badgesize.io/https://unpkg.com/downshift/dist/downshift.umd.min.js?label=size&style=flat-square
[unpkg-lib]: https://unpkg.com/@alekna/react-store@1.0.5/lib
