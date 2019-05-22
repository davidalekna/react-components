export interface IToast {
  id: string;
}

export type State = {
  topLeft: IToast[];
  topCenter: IToast[];
  topRight: IToast[];
  bottomLeft: IToast[];
  bottomCenter: IToast[];
  bottomRight: IToast[];
};

export type Placement =
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight'
  | 'topLeft'
  | 'topCenter'
  | 'topRight';

export type Options = {
  appearance?: 'error' | 'info' | 'success';
  autoDismiss?: boolean;
  position: Placement;
  delay: number;
};
