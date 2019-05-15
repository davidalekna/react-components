import { of, merge, from, Observable } from 'rxjs';
import { FIELD_BLUR, UPDATE, FORM_SUBMIT, FORM_RESET } from './actions';
import { fieldErrorUpdate } from './actions';
import {
  filter,
  switchMap,
  mergeMap,
  mapTo,
  mergeAll,
  scan,
  map,
  takeUntil,
  debounceTime,
  tap,
} from 'rxjs/operators';
import { FormActions } from './types';
import { FormState, IField } from '../types';
import {
  ofType,
  containsNoErrors,
  extractFinalValues,
  allErrorsEmitted,
} from './helpers';

const fieldValidator = (action$: Observable<FormActions>) => {
  return switchMap(({ payload }) => {
    // add requests into an Observable from
    const requests = payload.item.requirements
      .map(fn => from(Promise.resolve(fn(payload.item.value))))
      .filter(Boolean);

    // error$ stream generates errors over time and applies to field errors
    return of(...requests).pipe(
      mergeAll(),
      scan((allResponses: any, currentResponse) => {
        return [...allResponses, currentResponse];
      }, []),
      mergeMap(errors =>
        of(
          fieldErrorUpdate({
            ...payload,
            item: {
              ...payload.item,
              errors: errors.filter(Boolean),
              meta: {
                ...payload.item.meta,
                loading: requests.length !== errors.length,
              },
            },
          }),
        ),
      ),
      takeUntil(
        merge(
          action$.pipe(ofType(FORM_RESET)),
          action$.pipe(
            ofType(UPDATE),
            filter((innerAction: any) => {
              return innerAction.payload.name === payload.item.name;
            }),
          ),
        ).pipe(mapTo({ type: 'cancel-request' })),
      ),
    );
  });
};

export function fieldBlurEpic(action$: Observable<FormActions>) {
  return action$.pipe(
    ofType(FIELD_BLUR),
    mergeMap((action: any) => {
      return of(action).pipe(
        filter(
          ({ payload }) =>
            Array.isArray(payload.item.requirements) &&
            payload.item.requirements.length,
        ),
        fieldValidator(action$),
      );
    }),
  );
}

export function validateAllFieldsEpic(action$) {
  return action$.pipe(
    ofType(FORM_SUBMIT),
    debounceTime(250),
    switchMap(
      ({ payload, onSubmit }: { payload: FormState; onSubmit: Function }) => {
        const errorsBuffer: IField[] = [];
        const state$ = payload.map((item: IField, index: number) =>
          of({ index, item }),
        );

        return from(state$).pipe(
          mergeMap(field => {
            return field.pipe(
              filter(({ item }: any) => {
                return (
                  Array.isArray(item.requirements) && item.requirements.length
                );
              }),
              map(field => ({ payload: field })),
              fieldValidator(action$),
              tap(err => {
                // Side effect: process onSubmit
                errorsBuffer.push(err.payload.item);
                return (
                  allErrorsEmitted(payload, errorsBuffer.length) &&
                  containsNoErrors(errorsBuffer) &&
                  onSubmit(extractFinalValues(payload))
                );
              }),
            );
          }),
        );
      },
    ),
  );
}

// COMBINE EPICS

export const combineEpics = (...epics) => {
  return (...streams) => {
    return merge(
      streams[0],
      ...epics.map(epic => {
        const output$ = epic(...streams);
        if (!output$) {
          throw new TypeError(
            `combineEpics: one of the provided Epics "${epic.name ||
              '<anonymous>'}" does not return a stream. Double check you\'re not missing a return statement!`,
          );
        }
        return output$;
      }),
    );
  };
};
