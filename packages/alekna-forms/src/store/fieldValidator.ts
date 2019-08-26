import { of, merge, from, Observable, empty } from 'rxjs';
import { UPDATE, FORM_RESET } from './actions';
import { FormActions } from './types';
import { ofType } from './helpers';
import { fieldErrorUpdate } from './actions';
import {
  filter,
  switchMap,
  mergeMap,
  mapTo,
  mergeAll,
  scan,
  takeUntil,
} from 'rxjs/operators';

const fieldValidator = (actions$: Observable<FormActions>) => {
  return switchMap(({ payload }) => {
    // add requests into an Observable from
    const requests = payload.item.requirements
      // only function allowed in requests
      .filter(fn => typeof fn === 'function')
      // make each one an observable
      // ERROR: requests not being canceled on form reset
      .map(fn => from(Promise.resolve(fn(payload.item.value))))
      // filter falsy values
      .filter(Boolean);

    // error$ stream generator generates errors over
    // time and applies to field errors
    return of(...requests).pipe(
      mergeAll(),
      scan((allResponses: any, currentResponse) => {
        return [...allResponses, currentResponse];
      }, []),
      mergeMap(errors => {
        return of(
          fieldErrorUpdate({
            ...payload,
            item: {
              ...payload.item,
              meta: {
                ...payload.item.meta,
                loading: requests.length !== errors.length,
                errors: errors.filter(Boolean),
              },
            },
          }),
        );
      }),
      takeUntil(
        merge(
          actions$.pipe(ofType(FORM_RESET)),
          actions$.pipe(
            ofType(UPDATE),
            filter((innerAction: any) => {
              return innerAction.payload.name === payload.item.name;
            }),
          ),
        ).pipe(mapTo(empty())),
      ),
    );
  });
};

export default fieldValidator;
