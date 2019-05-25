import { merge as lodashMerge } from 'lodash';
import { of, merge, interval, empty, concat } from 'rxjs';
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
  tap,
  mergeAll,
} from 'rxjs/operators';
import {
  CREATE,
  DISMISS,
  CLEAR_ALL,
  MOUSE_ENTER,
  MOUSE_LEAVE,
} from './actions';
import { dismissToast, updateToast } from './actions';
import { ofType } from './helpers';

export function createEpic(action$) {
  return action$.pipe(
    ofType(CREATE),
    mergeMap((action: any) => {
      if (!action.payload.autoClose) {
        return of(action);
      }

      const actionWithCounter = lodashMerge(action, {
        payload: {
          countDown: true,
        },
      });

      const interval$ = interval(1000).pipe(mapTo(-1000));
      const pause$ = action$.pipe(ofType(MOUSE_ENTER)).pipe(
        mapTo(
          lodashMerge(actionWithCounter, {
            payload: { countDown: false },
          }),
        ),
      );
      const resume$ = action$.pipe(ofType(MOUSE_LEAVE)).pipe(
        mapTo(
          lodashMerge(actionWithCounter, {
            payload: { countDown: true },
          }),
        ),
      );

      return merge(pause$, resume$)
        .pipe(
          startWith(actionWithCounter),
          switchMap(val => (val.payload.countDown ? interval$ : empty())),
          scan((acc, curr: any) => {
            return lodashMerge(acc, {
              payload: {
                delay: curr + acc.payload.delay,
              },
            });
          }, actionWithCounter),
          takeWhile(v => v.payload.delay >= 0),
          mergeMap(({ payload: toast }) => {
            return of(updateToast(toast));
          }),
          tap(a => console.log('after', a)),
        )
        .pipe(
          // take until is not working
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
          // mapTo(dismissToast(action.payload.id)),
        );
    }),
  );
}
