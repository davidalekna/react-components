import { of, merge } from 'rxjs';
import { filter, delay, mergeMap, takeUntil, mapTo } from 'rxjs/operators';
import { CREATE, DISMISS, CLEAR_ALL } from './actions';
import { dismissToast } from './actions';
import { ofType } from './helpers';

export function createEpic(action$) {
  return action$.pipe(
    ofType(CREATE),
    mergeMap((action: any) => {
      if (!action.payload.autoClose) {
        return of(action);
      }

      return of(action).pipe(
        delay(action.payload.delay),
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
