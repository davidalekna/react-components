export default function todoReducer(_, action) {
  switch (action.type) {
    case 'ON_CHANGE':
      return action.payload;
    default:
      return '';
  }
}
