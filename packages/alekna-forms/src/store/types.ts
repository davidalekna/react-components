import { FormState, IField } from '../types';
import {
  UPDATE,
  FIELD_BLUR,
  FIELD_ERROR_UPDATE,
  ERROR,
  FIELD_FOCUS,
  ERRORS,
  FORM_RESET,
  FORM_SUBMIT,
} from './actions';

interface IAction {
  type: string;
}

class FieldUpdate implements IAction {
  readonly type = UPDATE;
  constructor(public payload: { name: string; value: unknown }) {}
}

class FieldBlur implements IAction {
  readonly type = FIELD_BLUR;
  constructor(public payload: { index: number; item: IField }) {}
}

class FieldErrorUpdate implements IAction {
  readonly type = FIELD_ERROR_UPDATE;
  constructor(public payload: { index: number; item: IField }) {}
}

class FieldError implements IAction {
  readonly type = ERROR;
  constructor(public payload: { index: number; item: IField }) {}
}

class FieldTouched implements IAction {
  readonly type = FIELD_FOCUS;
  constructor(public payload: { name: string; loading?: boolean }) {}
}

class Errors implements IAction {
  readonly type = ERRORS;
  constructor(public payload: FormState) {}
}

class FormSubmit implements IAction {
  readonly type = FORM_SUBMIT;
  constructor(public payload: FormState) {}
}

class Reset implements IAction {
  readonly type = FORM_RESET;
}

export type FormActions =
  | FieldUpdate
  | FieldBlur
  | FieldErrorUpdate
  | FieldError
  | FieldTouched
  | Errors
  | FormSubmit
  | Reset;
