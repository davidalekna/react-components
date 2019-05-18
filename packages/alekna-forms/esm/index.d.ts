import * as React from 'react';
import { IDefaultProps, IFormContext } from './types';
export declare const FormContext: React.Context<IFormContext>;
export declare function Form({ children, initialFields, onSubmit, epics, }: IDefaultProps): JSX.Element;
export declare function useFormContext(): IFormContext;
/**
 * Useful when rendering fields from a map. Works with and without context.
 */
export declare const MemoField: React.MemoExoticComponent<({ children, render, field }: any) => any>;
/**
 * If form has to have some shape, this component will select field by name
 */
export declare const Field: ({ name, children, render, }: {
    name: string;
    children?: Function | undefined;
    render?: Function | undefined;
}) => any;
