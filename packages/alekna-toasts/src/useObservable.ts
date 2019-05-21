import { useEffect, useState } from 'react';
import { Subject, merge } from 'rxjs';
import { scan, tap, filter } from 'rxjs/operators';
import reducer from './store/reducer';
import { CREATE } from './store/actions';
import combineEpics from './store/combineEpics';

const action$ = new Subject();

const epic = action$ => {
  return action$.pipe(
    filter((action: any) => action.type === CREATE),
    tap(action => console.log(action)),
  );
};

const useObservable = <T>(initialState?: T) => {
  const [state, update] = useState<T>(initialState);

  const dispatch = (next: Object) => action$.next(next);

  // TODO: combineEpics

  useEffect(() => {
    const s = merge(action$, epic)
      .pipe(scan<any>(reducer, initialState))
      .subscribe(update);

    return () => s.unsubscribe();
  }, [action$]);

  return { state, dispatch };
};

export default useObservable;
