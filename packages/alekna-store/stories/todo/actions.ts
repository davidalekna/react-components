export const ADD_TODO = 'ADD_TODO';

export const addTodo = newItem => {
  return {
    type: ADD_TODO,
    payload: newItem,
  };
};
