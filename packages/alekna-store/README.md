<div align="center">
<h1>@alekna/react-store</h1>

<p>async redux type store for react with rxjs touch.</p>

</div>

<hr />

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Usage](#usage)
  - [Usage with hooks api](#usage-with-hooks-api)
  - [Usage with render props and context api](#usage-with-render-props-and-context-api)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Usage

> [Try it out in the browser](https://codesandbox.io/s/aleknareact-store-hooks-8fgiw)

### Usage with hooks api

> [Try it out in the browser](https://codesandbox.io/s/aleknareact-store-hooks-754lm)

```jsx
import React from 'react';
import { render } from 'react-dom';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { useStore, createStore, dispatch } from '@alekna/react-store';

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
  const { state } = useStore(storeConfig);

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
import StoreProvider, {
  createStore,
  useSelector,
  dispatch,
} from '@alekna/react-store';

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
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>Start typing bellow</h1>
        <Input />
      </div>
    </StoreProvider>
  );
}

function Input() {
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
