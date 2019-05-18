export declare const UPDATE = "@@frm/UPDATE";
export declare const FIELD_BLUR = "@@frm/FIELD_BLUR";
export declare const FIELD_ERROR_UPDATE = "@@frm/FIELD_ERROR_UPDATE";
export declare const ERROR = "@@frm/ERROR";
export declare const FIELD_FOCUS = "@@frm/FIELD_FOCUS";
export declare const ERRORS = "@@frm/ERRORS";
export declare const FORM_RESET = "@@frm/FORM_RESET";
export declare const FORM_SUBMIT = "@@frm/FORM_SUBMIT";
import { IField, FormState } from '../types';
export declare function fieldUpdate({ name, value }: {
    name: string;
    value: any;
}): {
    type: string;
    payload: {
        name: string;
        value: any;
    };
};
export declare function fieldBlur({ index, item }: {
    index: number;
    item: IField;
}): {
    type: string;
    payload: {
        index: number;
        item: IField;
    };
};
export declare function fieldFocus(name: string): {
    type: string;
    payload: {
        name: string;
    };
};
export declare function formReset(): {
    type: string;
};
export declare function formSubmit(state: FormState, onSubmit: Function): {
    type: string;
    payload: {
        readonly [x: string]: any;
        readonly name: string;
        readonly value: any;
        readonly type: string;
        readonly meta: {
            touched: boolean;
            loading: boolean;
            errors: unknown[];
        };
        readonly label?: string | undefined;
        readonly placeholder?: string | undefined;
        readonly requirements?: Function[] | undefined;
    }[];
    onSubmit: Function;
};
export declare function formErrors(state: FormState): {
    type: string;
    payload: {
        readonly [x: string]: any;
        readonly name: string;
        readonly value: any;
        readonly type: string;
        readonly meta: {
            touched: boolean;
            loading: boolean;
            errors: unknown[];
        };
        readonly label?: string | undefined;
        readonly placeholder?: string | undefined;
        readonly requirements?: Function[] | undefined;
    }[];
};
export declare function fieldErrorUpdate(field: IField): {
    type: string;
    payload: IField;
};
