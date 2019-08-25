import React from 'react';
import { storiesOf } from '@storybook/react';
import StoreProvider, { dispatch, createStore, ofType } from '../index';
import { Action } from '../types';

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';

function addTodo(newItem) {
  return {
    type: ADD_TODO,
    payload: newItem,
  };
}

function removeTodo(title: string) {
  return {
    type: REMOVE_TODO,
    payload: title,
  };
}

const initialTodosState = [
  { title: 'Learn RxJS' },
  { title: 'Learn Serverles' },
  { title: 'Learn Aws' },
  { title: 'Learn Docker' },
  { title: 'Learn Lambdas' },
  { title: 'Learn Animations' },
  { title: 'Learn React Native' },
];

const store = createStore(
  {
    todo: (state, action) => {
      switch (action.type) {
        case 'ON_CHANGE':
          return action.payload;
        default:
          return '';
      }
    },
    todos: (state = initialTodosState, action: Action) => {
      switch (action.type) {
        case ADD_TODO:
          return [...state, action.payload];
        case REMOVE_TODO:
          return state.filter(todo => {
            return todo.title !== action.payload;
          });
        default:
          return state;
      }
    },
  },
  [actions => actions.pipe(ofType('ON_CHANGE'))],
);

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
