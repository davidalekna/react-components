import { UPDATE, FIELD_BLUR, FIELD_ERROR_UPDATE, ERROR, FIELD_FOCUS, ERRORS, FORM_RESET, FORM_SUBMIT, } from './actions';
class FieldUpdate {
    constructor(payload) {
        this.payload = payload;
        this.type = UPDATE;
    }
}
class FieldBlur {
    constructor(payload) {
        this.payload = payload;
        this.type = FIELD_BLUR;
    }
}
class FieldErrorUpdate {
    constructor(payload) {
        this.payload = payload;
        this.type = FIELD_ERROR_UPDATE;
    }
}
class FieldError {
    constructor(payload) {
        this.payload = payload;
        this.type = ERROR;
    }
}
class FieldTouched {
    constructor(payload) {
        this.payload = payload;
        this.type = FIELD_FOCUS;
    }
}
class Errors {
    constructor(payload) {
        this.payload = payload;
        this.type = ERRORS;
    }
}
class FormSubmit {
    constructor(payload) {
        this.payload = payload;
        this.type = FORM_SUBMIT;
    }
}
class Reset {
    constructor() {
        this.type = FORM_RESET;
    }
}
