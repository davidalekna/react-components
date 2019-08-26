import { IField, FormState } from '../types';
import {
  mergeMap,
  filter,
  throttleTime,
  switchMap,
  map,
  tap,
} from 'rxjs/operators';
import { of, Observable, from } from 'rxjs';
import { fieldValidator } from './epics';
import {
  containsNoErrors,
  extractFinalValues,
  allErrorsEmitted,
} from './helpers';

export const UPDATE = '@@frm/UPDATE';
export const FIELD_BLUR = '@@frm/FIELD_BLUR';
export const FIELD_ERROR_UPDATE = '@@frm/FIELD_ERROR_UPDATE';
export const ERROR = '@@frm/ERROR';
export const FIELD_FOCUS = '@@frm/FIELD_FOCUS';
export const ERRORS = '@@frm/ERRORS';
export const FORM_RESET = '@@frm/FORM_RESET';
export const FORM_SUBMIT = '@@frm/FORM_SUBMIT';
export const NOTHING = '@@frm/NOTHING';

export function fieldUpdate({ name, value }: { name: string; value: any }) {
  return {
    type: UPDATE,
    payload: {
      name,
      value,
    },
  };
}

export const fieldBlur: any = ({ item }: { item: IField }) => (
  actions$: Observable<any>,
) => {
  return of({
    type: FIELD_BLUR,
    payload: { item },
  }).pipe(
    mergeMap((action: any) => {
      return of(action).pipe(
        filter(
          ({ payload }) =>
            Array.isArray(payload.item.requirements) &&
            payload.item.requirements.length,
        ),
        fieldValidator(actions$),
      );
    }),
  );
};

export function fieldFocus(name: string) {
  return {
    type: FIELD_FOCUS,
    payload: { name },
  };
}

export function formReset() {
  return {
    type: FORM_RESET,
  };
}

export const formSubmit: any = (state: any, onSubmit: Function) => actions$ => {
  return of({
    type: FORM_SUBMIT,
    payload: state,
    onSubmit,
  }).pipe(
    throttleTime(1500),
    switchMap(({ payload, onSubmit }: { payload: any; onSubmit: Function }) => {
      const errorsBuffer: IField[] = [];
      const state$ = Array.from(payload.values()).map((item: IField) =>
        of(item),
      );

      return from(state$).pipe(
        mergeMap((field: any) => {
          return field.pipe(
            filter((item: any) => {
              return (
                Array.isArray(item.requirements) && item.requirements.length
              );
            }),
            map(field => ({ payload: { item: field } })),
            fieldValidator(actions$),
            tap((err: any) => {
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
    }),
  );
};

export function formErrors(state: FormState) {
  return {
    type: ERRORS,
    payload: state,
  };
}

export function fieldErrorUpdate(field: IField) {
  return {
    type: FIELD_ERROR_UPDATE,
    payload: field,
  };
}
