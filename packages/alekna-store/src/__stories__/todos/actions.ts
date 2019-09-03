import { delay } from 'rxjs/operators';
import { of } from 'rxjs';

export const REMOVE_TODO = 'REMOVE_TODO';

export const removeTodo = (title: string) => actions$ => {
  return of({
    type: REMOVE_TODO,
    payload: title,
  }).pipe(delay(5000));
};
