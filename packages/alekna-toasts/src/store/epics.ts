import { of, merge, interval, empty } from 'rxjs';
import {
  mergeMap,
  mapTo,
  startWith,
  switchMap,
  scan,
  takeWhile,
  takeUntil,
  map,
} from 'rxjs/operators';
import {
  CREATE,
  MOUSE_ENTER,
  MOUSE_LEAVE,
  CLEAR_ALL,
  DISMISS,
} from './actions';
import { dismissToast, updateToast } from './actions';
import { ofType, filterById } from './helpers';

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
          filterById(action.payload.id),
        )
        .pipe(mapTo(false));
      const resume$ = action$
        .pipe(
          ofType(MOUSE_LEAVE),
          filterById(action.payload.id),
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
        map(countdown => {
          if (countdown === 0) return dismissToast(action.payload.id);
          return updateToast({ ...action.payload, countdown });
        }),
        takeUntil(
          merge(
            action$.pipe(ofType(CLEAR_ALL)),
            action$.pipe(
              ofType(DISMISS),
              filterById(action.payload.id),
            ),
          ).pipe(mapTo(dismissToast(action.payload.id))),
        ),
      );
    }),
  );
}
