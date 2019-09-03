export default function todoReducer(state = '', action) {
  switch (action.type) {
    case 'ON_CHANGE':
      return action.payload;
    default:
      return state;
  }
}
