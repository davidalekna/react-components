import { FormActions } from './types';
export declare const getFromStateByName: (state: {
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
}[]) => (itemName: string) => {
    item: {
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
    };
    index: number;
};
declare const formReducer: (initialState: {
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
}[]) => (state: {
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
}[], action: FormActions) => {
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
export default formReducer;
