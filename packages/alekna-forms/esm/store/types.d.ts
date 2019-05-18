import { FormState, IField } from '../types';
interface IAction {
    type: string;
}
declare class FieldUpdate implements IAction {
    payload: {
        name: string;
        value: unknown;
    };
    readonly type = "@@frm/UPDATE";
    constructor(payload: {
        name: string;
        value: unknown;
    });
}
declare class FieldBlur implements IAction {
    payload: {
        index: number;
        item: IField;
    };
    readonly type = "@@frm/FIELD_BLUR";
    constructor(payload: {
        index: number;
        item: IField;
    });
}
declare class FieldErrorUpdate implements IAction {
    payload: {
        index: number;
        item: IField;
    };
    readonly type = "@@frm/FIELD_ERROR_UPDATE";
    constructor(payload: {
        index: number;
        item: IField;
    });
}
declare class FieldError implements IAction {
    payload: {
        index: number;
        item: IField;
    };
    readonly type = "@@frm/ERROR";
    constructor(payload: {
        index: number;
        item: IField;
    });
}
declare class FieldTouched implements IAction {
    payload: {
        name: string;
        loading?: boolean;
    };
    readonly type = "@@frm/FIELD_FOCUS";
    constructor(payload: {
        name: string;
        loading?: boolean;
    });
}
declare class Errors implements IAction {
    payload: FormState;
    readonly type = "@@frm/ERRORS";
    constructor(payload: FormState);
}
declare class FormSubmit implements IAction {
    payload: FormState;
    readonly type = "@@frm/FORM_SUBMIT";
    constructor(payload: FormState);
}
declare class Reset implements IAction {
    readonly type = "@@frm/FORM_RESET";
}
export declare type FormActions = FieldUpdate | FieldBlur | FieldErrorUpdate | FieldError | FieldTouched | Errors | FormSubmit | Reset;
export {};
