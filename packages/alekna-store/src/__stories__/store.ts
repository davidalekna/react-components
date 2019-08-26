import { createStore } from '../index';
import todoReducer from './todo/reducer';
import todosReducer from './todos/reducer';

export const store = createStore({
  todo: todoReducer,
  todos: todosReducer,
});
