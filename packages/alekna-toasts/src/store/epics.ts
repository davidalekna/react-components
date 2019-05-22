import { of } from 'rxjs';
import { filter, tap, delay, mergeMap, takeUntil, mapTo } from 'rxjs/operators';
import { CREATE, DISMISS } from './actions';
import { dismissToast } from './actions';
import { ofType } from './helpers';

export function createEpic(action$) {
  return action$.pipe(
    ofType(CREATE),
    mergeMap((action: any) => {
      return of(action).pipe(
        delay(action.payload.delay),
        takeUntil(
          action$.pipe(
            ofType(DISMISS),
            filter(({ payload }: any) => {
              return payload === action.payload.id;
            }),
          ),
        ),
        mapTo(dismissToast(action.payload.id)),
      );
    }),
  );
}
