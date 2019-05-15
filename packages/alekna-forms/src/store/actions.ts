export const UPDATE = '@@frm/UPDATE';
export const FIELD_BLUR = '@@frm/FIELD_BLUR';
export const FIELD_ERROR_UPDATE = '@@frm/FIELD_ERROR_UPDATE';
export const ERROR = '@@frm/ERROR';
export const TOUCHED = '@@frm/TOUCHED';
export const ERRORS = '@@frm/ERRORS';
export const FORM_RESET = '@@frm/FORM_RESET';
export const FORM_SUBMIT = '@@frm/FORM_SUBMIT';

import { IField, FormState } from '../types';

export function fieldUpdate({ name, value }: { name: string; value: any }) {
  return {
    type: UPDATE,
    payload: {
      name,
      value,
    },
  };
}

export function fieldBlur({ index, item }: { index: number; item: IField }) {
  return {
    type: FIELD_BLUR,
    payload: { index, item },
  };
}

export function fieldTouched(name: string) {
  return {
    type: TOUCHED,
    payload: { name },
  };
}

export function formReset() {
  return {
    type: FORM_RESET,
  };
}

export function formSubmit(state: FormState, onSubmit: Function) {
  return {
    type: FORM_SUBMIT,
    payload: state,
    onSubmit,
  };
}

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
