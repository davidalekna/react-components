import React from 'react';
import { storiesOf } from '@storybook/react';
import StoreProvider, { useStoreState } from '../src/index';
import { addTodo } from './todo/actions';
import { removeTodo } from './todos/actions';
import { store } from './store';
import uuid from 'uuid';

function SampleComponent() {
  const [state, dispatch] = useStoreState();
  console.log(state);
  return (
    <div style={{ padding: '20px 50px' }}>
      <form
        onSubmit={evt => {
          evt.preventDefault();
          if (state.todo) {
            dispatch(
              addTodo({
                title: state.todo + uuid(),
              }),
            );
            dispatch({
              type: 'ON_CLEAR',
            });
          }
        }}
      >
        <input
          type="text"
          value={state.todo}
          onChange={evt =>
            dispatch({
              type: 'ON_CHANGE',
              payload: evt.target.value,
            })
          }
        />
        <button type="submit">add todo</button>
      </form>
      <div
        style={{
          marginTop: 50,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {state.todos.map(todo => (
          <button
            type="button"
            key={todo.title}
            onClick={() => dispatch(removeTodo(todo.title))}
          >
            {todo.title}
          </button>
        ))}
      </div>
    </div>
  );
}

const Demo = () => {
  console.log('demo initialized');
  return (
    <StoreProvider store={store}>
      <SampleComponent />
    </StoreProvider>
  );
};

storiesOf('StoreProvider', module).add('Demo', () => <Demo />);
