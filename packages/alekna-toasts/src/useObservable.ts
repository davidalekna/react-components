import { useEffect, useState } from 'react';
import { Subject } from 'rxjs';
import { scan, distinctUntilChanged, merge } from 'rxjs/operators';
import reducer from './store/reducer';
import { createEpic } from './store/epics';

const action$ = new Subject();

const useObservable = <T>(initialState?: T) => {
  const [state, update] = useState<T>(initialState);

  const dispatch = (next: Object) => action$.next(next);

  useEffect(() => {
    const s = action$
      .pipe(merge(createEpic(action$)))
      .pipe(distinctUntilChanged())
      .pipe(scan<any>(reducer, initialState))
      .subscribe(update);

    return () => s.unsubscribe();
  }, [action$]);

  return { state, dispatch };
};

export default useObservable;
