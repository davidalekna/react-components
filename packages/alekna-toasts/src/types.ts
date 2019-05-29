export interface IToast {
  id: string;
  onClick: Function;
  onMouseEnter: Function;
  onMouseLeave: Function;
  position: string;
  delay: number;
  paused: boolean;
  autoClose: boolean;
  countdown: number;
  jsx: JSX.Element;
}

export type Placement =
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight'
  | 'topLeft'
  | 'topCenter'
  | 'topRight';

export type Positions = { [prop in Placement]: IToast };
export type State = { [prop in Placement]: IToast[] };

export type Config = {
  position: Placement;
  autoClose: boolean;
};
