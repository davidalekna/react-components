import { of, merge, interval, empty } from 'rxjs';
import {
  filter,
  delay,
  mergeMap,
  takeUntil,
  mapTo,
  startWith,
  switchMap,
  scan,
  takeWhile,
} from 'rxjs/operators';
import {
  CREATE,
  DISMISS,
  CLEAR_ALL,
  MOUSE_ENTER,
  MOUSE_LEAVE,
} from './actions';
import { dismissToast } from './actions';
import { ofType } from './helpers';

export function createEpic(action$) {
  return action$.pipe(
    ofType(CREATE),
    mergeMap((action: any) => {
      if (!action.payload.autoClose) {
        return of(action);
      }

      // TODO: re implement the timer

      // const interval$ = interval(1000).pipe(mapTo(-1));
      // const pause$ = action$.pipe(ofType(MOUSE_ENTER)).pipe(mapTo(false));
      // const resume$ = action$.pipe(ofType(MOUSE_LEAVE)).pipe(mapTo(true));

      // const timer$ = merge(pause$, resume$).pipe(
      //   startWith(true),
      //   switchMap(val => (val ? interval$ : empty())),
      //   scan(
      //     (acc, curr) => (curr ? curr + acc : acc),
      //     action.payload.delay / 1000,
      //   ),
      //   takeWhile(v => v >= 0),
      // );

      return of(action).pipe(
        // start delay
        delay(action.payload.delay),
        // take until CLEAR_ALL or DISMISS and map to action dismissToast
        takeUntil(
          merge(
            action$.pipe(ofType(CLEAR_ALL)),
            action$.pipe(
              ofType(DISMISS),
              filter(({ payload }: any) => {
                return payload === action.payload.id;
              }),
            ),
          ),
        ),
        mapTo(dismissToast(action.payload.id)),
      );
    }),
  );
}
