export interface IField {
  name: string;
  value: any;
  type: string;
  meta: {
    touched: boolean;
    loading: boolean;
    errors: unknown[];
  };
  label?: string;
  placeholder?: string;
  requirements?: Function[];
  [key: string]: any;
}

export type FormState = { readonly [K in keyof IField]: IField[K] };

export type InputEvent = React.ChangeEvent<HTMLInputElement>;

export interface ICustomInput {
  name: string;
  value: string;
}

export interface IFinalValues {
  [key: string]: any;
}

export interface IDefaultProps {
  children: Function | unknown;
  initialFields: any[];
  epics?: Function[];
  onSubmit: (values: any) => void;
  onStateChange?: (params: FormState) => void;
}

export interface IFormContext {
  fields: any;
  handleSubmit: Function;
  reset: Function;
  touched: Boolean;
}
