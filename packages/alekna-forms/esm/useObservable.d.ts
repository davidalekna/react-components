declare const useObservable: (initialState: {
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
}[], outsideEpics?: Function[]) => {
    state: {
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
    dispatch: Function;
};
export default useObservable;
