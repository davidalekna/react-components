import { of, merge, interval, empty } from 'rxjs';
import {
  filter,
  mergeMap,
  mapTo,
  startWith,
  switchMap,
  scan,
  takeWhile,
  last,
  tap,
} from 'rxjs/operators';
import { CREATE, MOUSE_ENTER, MOUSE_LEAVE } from './actions';
import { dismissToast, updateToast } from './actions';
import { ofType } from './helpers';

export function createEpic(action$) {
  return action$.pipe(
    ofType(CREATE),
    mergeMap((action: any) => {
      if (!action.payload.autoClose) {
        return of(action);
      }

      const interval$ = interval(1000).pipe(mapTo(-1));
      const pause$ = action$
        .pipe(
          ofType(MOUSE_ENTER),
          filter(({ payload }: any) => {
            return payload === action.payload.id;
          }),
        )
        .pipe(mapTo(false));
      const resume$ = action$
        .pipe(
          ofType(MOUSE_LEAVE),
          filter(({ payload }: any) => {
            return payload === action.payload.id;
          }),
        )
        .pipe(mapTo(true));

      return merge(pause$, resume$).pipe(
        startWith(true),
        switchMap(val => (val ? interval$ : empty())),
        scan(
          (acc, curr) => (curr ? curr + acc : acc),
          action.payload.delay / 1000,
        ),
        takeWhile(v => v >= 0),
        // ERROR: wont stop on termination
        tap(countdown => console.log(countdown)),
        // TODO: update countdown on Toast object
        // switchMap(countdown => {
        //   console.log('mergeMap', countdown);
        //   return of(updateToast(countdown));
        // }),
        last(),
        mapTo(dismissToast(action.payload.id)),
        // bring back takeUntil to cancel inflight requests!
      );
    }),
  );
}
