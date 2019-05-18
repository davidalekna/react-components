import { filter } from 'rxjs/operators';
import { merge } from 'lodash';
export const createObject = (obj) => {
    if (!obj)
        return {};
    const isPlainObject = obj => !!obj && obj.constructor === {}.constructor;
    const getNestedObject = obj => Object.entries(obj).reduce((result, [prop, val]) => {
        prop.split('.').reduce((nestedResult, prop, propIndex, propArray) => {
            const lastProp = propIndex === propArray.length - 1;
            if (lastProp) {
                nestedResult[prop] = isPlainObject(val) ? getNestedObject(val) : val;
            }
            else {
                nestedResult[prop] = nestedResult[prop] || {};
            }
            return nestedResult[prop];
        }, result);
        return result;
    }, {});
    return getNestedObject(obj);
};
export const isBoolean = (val) => typeof val === 'boolean';
export function ofType(actionType) {
    return filter(({ type }) => type === actionType);
}
export function containsNoErrors(fields) {
    return (fields
        .map((field) => field.meta.errors)
        .reduce((acc, val) => {
        return acc.concat(val);
    }, []).length === 0);
}
export function extractFinalValues(state) {
    return state.reduce((acc, field) => {
        if ((field.value && !isBoolean(field.value)) || isBoolean(field.value)) {
            return merge(acc, createObject({ [field.name]: field.value }));
        }
        return acc;
    }, {});
}
export function allErrorsEmitted(state, totalErrors) {
    return (state
        .filter(item => item.requirements)
        .reduce((acc, val) => {
        return acc.concat(val.requirements);
    }, []).length === totalErrors);
}
