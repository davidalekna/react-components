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

export type FormState = { readonly [K in keyof IField]: IField[K] }[];

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
  onSubmit: Function;
  epics?: Function[];
}

export interface IFormContext {
  fields: FormState;
  handleSubmit: Function;
  reset: Function;
  touched: Boolean;
}
