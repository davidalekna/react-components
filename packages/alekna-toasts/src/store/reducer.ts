import { CREATE, DISMISS } from './actions';

export default function reducer(state, action) {
  switch (action.type) {
    case CREATE:
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };
    case DISMISS:
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload),
      };
    default:
      return state;
  }
}
