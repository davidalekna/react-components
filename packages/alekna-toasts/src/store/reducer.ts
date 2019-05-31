import {
  CREATE,
  DISMISS,
  CLEAR_ALL,
  UPDATE,
  MOUSE_ENTER,
  MOUSE_LEAVE,
} from './actions';

const findPosition = state => id => {
  return Object.keys(state).find(key => {
    return state[key].find(s => s.id === id);
  });
};

const getFromStateByName = state => (position, id) => {
  let itemIndex: number = 0;
  const item = state[position].find((toast, index) => {
    itemIndex = index;
    return toast.id === id;
  });
  if (!item) {
    throw Error(`input name ${id} doesnt exist on provided fields`);
  }
  return {
    item,
    index: itemIndex,
    position,
  };
};

export default function reducer(state, action) {
  const findPlacement = findPosition(state);
  const findItem = getFromStateByName(state);
  switch (action.type) {
    case CREATE: {
      return {
        ...state,
        [action.payload.position]: [
          ...state[action.payload.position],
          action.payload,
        ],
      };
    }
    case DISMISS: {
      const placement = findPlacement(action.payload);
      if (!placement) return state;
      return {
        ...state,
        [placement]: state[placement].filter(
          toast => toast.id !== action.payload,
        ),
      };
    }
    case UPDATE: {
      const index = state[action.payload.position].findIndex(
        item => item.id === action.payload.id,
      );
      state[action.payload.position][index]['progress'] =
        action.payload.progress;
      return { ...state };
    }
    case MOUSE_ENTER: {
      const placement = findPlacement(action.payload);
      const { item, index, position } = findItem(placement, action.payload);
      const newState = { ...state };
      newState[position][index] = { ...item, paused: true };
      return newState;
    }
    case MOUSE_LEAVE: {
      const placement = findPlacement(action.payload);
      const { item, index, position } = findItem(placement, action.payload);
      const newState = { ...state };
      newState[position][index] = { ...item, paused: false };
      return newState;
    }
    case CLEAR_ALL: {
      return Object.keys(state).reduce((acc, key) => {
        return Object.assign(acc, {
          [key]: [],
        });
      }, {});
    }
    default:
      return state;
  }
}
