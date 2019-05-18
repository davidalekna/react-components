import { useEffect, useState } from 'react';
import { Subject } from 'rxjs';
import { scan } from 'rxjs/operators';
import { FormState } from './types';
import { combineEpics, onBlurEpic, onSubmitEpic } from './store/epics';
import formReducer from './store/reducer';

const action$ = new Subject();

const useObservable = (
  initialState: FormState,
  outsideEpics: Function[] = [],
): { state: FormState; dispatch: Function } => {
  const [state, update] = useState<FormState>(initialState);

  const combinedEpics = combineEpics(onBlurEpic, onSubmitEpic, ...outsideEpics);

  const dispatch = (next: Object) => action$.next(next);

  useEffect(() => {
    const s = combinedEpics(action$)
      .pipe(scan<any>(formReducer(initialState), initialState))
      .subscribe(update);

    return () => s.unsubscribe();
  }, [action$]);

  return { state, dispatch };
};

export default useObservable;
