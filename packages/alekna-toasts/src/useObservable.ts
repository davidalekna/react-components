import { useEffect, useState } from 'react';
import { Subject, of, merge, combineLatest } from 'rxjs';
import {
  scan,
  filter,
  distinctUntilChanged,
  switchMap,
  takeLast,
  tap,
  take,
  last,
  combineAll,
} from 'rxjs/operators';
import reducer from './store/reducer';
import { CREATE } from './store/actions';
import { dismissToast } from './store/actions';

function ofType(actionType: string) {
  return filter(({ type }: any) => type === actionType);
}

const action$ = new Subject();

const useObservable = <T>(initialState?: T) => {
  const [state, update] = useState<T>(initialState);

  const dispatch = (next: Object) => action$.next(next);

  // TODO: combineEpics

  useEffect(() => {
    const s = merge(
      action$,
      action$.pipe(
        ofType(CREATE),
        switchMap(payload => {
          // TODO: dispatch onDismiss in some amount of time
          return of(payload);
        }),
      ),
      action$,
      action$,
    )
      .pipe(
        tap(item => console.log('before', item)),
        distinctUntilChanged(),
        tap(item => console.log('after', item)),
      )
      .pipe(scan<any>(reducer, initialState))
      .subscribe(update);

    return () => s.unsubscribe();
  }, [action$]);

  return { state, dispatch };
};

export default useObservable;
