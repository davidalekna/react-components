import { FormActions } from './types';
import { FormState, IFinalValues, IField } from '../types';
export declare const createObject: (obj: void | {
    [key: string]: unknown;
}) => {};
export declare const isBoolean: (val: unknown) => boolean;
export declare function ofType(actionType: string): import("rxjs").MonoTypeOperatorFunction<FormActions>;
export declare function containsNoErrors(fields: IField[]): boolean;
export declare function extractFinalValues(state: FormState): IFinalValues;
export declare function allErrorsEmitted(state: FormState, totalErrors: number): boolean;
