import { merge, of, concat, race } from 'rxjs';
import {
  filter,
  tap,
  delay,
  mergeMap,
  takeUntil,
  map,
  mapTo,
  switchMap,
} from 'rxjs/operators';
import { CREATE, DISMISS } from './actions';
import { dismissToast } from './actions';
import { ofType } from './helpers';

export function createEpic(action$) {
  return action$.pipe(
    ofType(CREATE),
    mergeMap((action: any) => {
      return of(action).pipe(
        // ERROR: delay is being called uppon manual dismissal as well
        delay(3500),
        takeUntil(
          action$.pipe(
            ofType(DISMISS),
            filter(({ payload }: any) => {
              return payload.id === action.payload.id;
            }),
          ),
        ),
        mapTo(dismissToast(action.payload.id)),
      );
    }),
  );
}
