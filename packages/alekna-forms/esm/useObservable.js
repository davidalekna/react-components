import { useEffect, useState } from 'react';
import { Subject } from 'rxjs';
import { scan } from 'rxjs/operators';
import { combineEpics, onBlurEpic, onSubmitEpic } from './store/epics';
import formReducer from './store/reducer';
const action$ = new Subject();
const useObservable = (initialState, outsideEpics = []) => {
    const [state, update] = useState(initialState);
    const combinedEpics = combineEpics(onBlurEpic, onSubmitEpic, ...outsideEpics);
    const dispatch = (next) => action$.next(next);
    useEffect(() => {
        const s = combinedEpics(action$)
            .pipe(scan(formReducer(initialState), initialState))
            .subscribe(update);
        return () => s.unsubscribe();
    }, [action$]);
    return { state, dispatch };
};
export default useObservable;
