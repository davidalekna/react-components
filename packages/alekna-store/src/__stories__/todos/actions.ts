import { delay, mapTo, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ofType } from '../../index';
import { ADD_TODO } from '../todo/actions';

export const REMOVE_TODO = 'REMOVE_TODO';

export const removeTodo = (title: string) => actions$ => {
  return of({
    type: REMOVE_TODO,
    payload: title,
  }).pipe(
    delay(2500),
    switchMap(payload => {
      return actions$.pipe(
        ofType(ADD_TODO),
        mapTo(payload),
      );
    }),
  );
};
