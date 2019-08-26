import React from 'react';
import { storiesOf } from '@storybook/react';
import StoreProvider, { dispatch } from '../index';
import { addTodo } from './todo/actions';
import { removeTodo } from './todos/actions';
import { store } from './store';

const Demo = () => {
  console.log('demo initialized');
  return (
    <StoreProvider store={store}>
      {({ state: { todos, todo } }) => {
        return (
          <div style={{ padding: '20px 50px' }}>
            <form
              onSubmit={evt => {
                evt.preventDefault();
                if (todo) {
                  dispatch(
                    addTodo({
                      title: todo,
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
                value={todo}
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
              {todos.map(todo => (
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
      }}
    </StoreProvider>
  );
};

storiesOf('async validation', module).add('Demo', () => <Demo />);
