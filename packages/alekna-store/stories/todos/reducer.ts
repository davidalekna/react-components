import { REMOVE_TODO } from './actions';
import { ADD_TODO } from '../todo/actions';
import { SyncAction } from '../../src/types';

const initialTodosState = [
  { title: 'Learn RxJS' },
  { title: 'Learn Serverles' },
  { title: 'Learn Aws' },
  { title: 'Learn Docker' },
  { title: 'Learn Lambdas' },
  { title: 'Learn Animations' },
  { title: 'Learn React Native' },
];

export default function todosReducer(
  state = initialTodosState,
  action: SyncAction,
) {
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
}
