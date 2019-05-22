import { CREATE, DISMISS } from './actions';

const findPosition = state => id => {
  return Object.keys(state).find(key => {
    return state[key].find(s => s.id === id);
  });
};

export default function reducer(state, action) {
  const findPlacement = findPosition(state);
  switch (action.type) {
    case CREATE:
      return {
        ...state,
        [action.payload.position]: [
          ...state[action.payload.position],
          action.payload,
        ],
      };
    case DISMISS:
      const placement = findPlacement(action.payload);
      if (!placement) return state;
      return {
        ...state,
        [placement]: state[placement].filter(
          toast => toast.id !== action.payload,
        ),
      };
    default:
      return state;
  }
}
