export interface IToast {
  id: string;
}

export type State = {
  toasts: IToast[];
};

export type Placement =
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'top-left'
  | 'top-center'
  | 'top-right';

export type Options = {
  appearance?: 'error' | 'info' | 'success';
  autoDismiss?: boolean;
};
