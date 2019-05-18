export const UPDATE = '@@frm/UPDATE';
export const FIELD_BLUR = '@@frm/FIELD_BLUR';
export const FIELD_ERROR_UPDATE = '@@frm/FIELD_ERROR_UPDATE';
export const ERROR = '@@frm/ERROR';
export const FIELD_FOCUS = '@@frm/FIELD_FOCUS';
export const ERRORS = '@@frm/ERRORS';
export const FORM_RESET = '@@frm/FORM_RESET';
export const FORM_SUBMIT = '@@frm/FORM_SUBMIT';
export function fieldUpdate({ name, value }) {
    return {
        type: UPDATE,
        payload: {
            name,
            value,
        },
    };
}
export function fieldBlur({ index, item }) {
    return {
        type: FIELD_BLUR,
        payload: { index, item },
    };
}
export function fieldFocus(name) {
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
export function formSubmit(state, onSubmit) {
    return {
        type: FORM_SUBMIT,
        payload: state,
        onSubmit,
    };
}
export function formErrors(state) {
    return {
        type: ERRORS,
        payload: state,
    };
}
export function fieldErrorUpdate(field) {
    return {
        type: FIELD_ERROR_UPDATE,
        payload: field,
    };
}
