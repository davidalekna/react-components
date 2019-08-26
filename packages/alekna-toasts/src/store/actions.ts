import { IToast } from '../types';
import { of, merge, interval, empty, concat } from 'rxjs';
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
import { ofType, filterById } from './helpers';

export const CREATE = '@@toasts/CREATE';
export const DISMISS = '@@toasts/DISMISS';
export const CLEAR_ALL = '@@toasts/CLEAR_ALL';
export const MOUSE_ENTER = '@@toasts/MOUSE_ENTER';
export const MOUSE_LEAVE = '@@toasts/MOUSE_LEAVE';
export const UPDATE = '@@toasts/UPDATE';

export const createToast = (config: IToast) => actions$ => {
  return of({
    type: CREATE,
    payload: config,
  }).pipe(
    mergeMap((action: any) => {
      if (!action.payload.autoClose) {
        return of(action);
      }

      // ERROR: if paused and unpaused stays longer than initial delay

      const interval$ = interval(1000).pipe(mapTo(-1));
      const pause$ = actions$
        .pipe(
          ofType(MOUSE_ENTER),
          filterById(action.payload.id),
        )
        .pipe(mapTo(false));
      const resume$ = actions$
        .pipe(
          ofType(MOUSE_LEAVE),
          filterById(action.payload.id),
        )
        .pipe(mapTo(true));

      // NOTE: when timer paused should map to -1

      return concat(
        of(action),
        merge(pause$, resume$).pipe(
          startWith(true),
          switchMap(val => (val ? interval$ : empty())),
          scan(
            (acc, curr) => (curr ? curr + acc : acc),
            action.payload.delay / 1000,
          ),
          takeWhile(v => v >= 0),
          map(cd => {
            if (cd === 0) return dismissToast(action.payload.id);
            return updateToast({ ...action.payload, progress: cd });
          }),
          takeUntil(
            merge(
              actions$.pipe(ofType(CLEAR_ALL)),
              actions$.pipe(
                ofType(DISMISS),
                filterById(action.payload.id),
              ),
            ).pipe(mapTo(dismissToast(action.payload.id))),
          ),
        ),
      );
    }),
  );
};

export function dismissToast(id: string) {
  return {
    type: DISMISS,
    payload: id,
  };
}

export function clearAll() {
  return {
    type: CLEAR_ALL,
  };
}

export function mouseEnter(id: string) {
  return {
    type: MOUSE_ENTER,
    payload: id,
  };
}

export function mouseLeave(id: string) {
  return {
    type: MOUSE_LEAVE,
    payload: id,
  };
}

export function updateToast(toast: IToast) {
  return {
    type: UPDATE,
    payload: toast,
  };
}
