export interface IField {
  name: string;
  value: any;
  type: string;
  meta: {
    touched?: boolean;
    loading?: boolean;
  };
  errors?: any[];
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
  initialFields?: any[];
  validate?: Function;
  onSubmit?: Function;
}

export interface IFrmContext {
  fields: FormState;
  [key: string]: any;
}
