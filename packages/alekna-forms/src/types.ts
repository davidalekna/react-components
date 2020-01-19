export interface FieldProps {
  name: string;
  value: any;
  type: string;
  meta?: {
    touched: boolean;
    loading: boolean;
    errors: unknown[];
  };
  label?: string;
  placeholder?: string;
  requirements?: any[];
  [key: string]: any;
}

export type FormState = { readonly [K in keyof FieldProps]: FieldProps[K] };

export type InputEvent = React.ChangeEvent<HTMLInputElement>;

export interface ICustomInput {
  name: string;
  value: string;
}

export interface IFinalValues {
  [key: string]: any;
}

export interface FormProps<T> {
  children: Function | unknown;
  initialState: T;
  epics?: Function[];
  onSubmit: (values: any) => void;
  onStateChange?: (params: { [key: string]: FieldProps }) => void;
}

export interface IFormContext {
  fields: any;
  handleSubmit: Function;
  reset: Function;
  touched: Boolean;
}

export type FormContextType = {
  fields: FieldProps[];
  handleSubmit: Function;
  reset: Function;
  touched: boolean;
  dispatch: Function;
  initialize: Function;
};
