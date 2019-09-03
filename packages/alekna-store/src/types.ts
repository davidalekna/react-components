import { Observable } from 'rxjs';

export type Reducers = {
  [key: string]: Function;
};

export type State = {
  [key: string]: any;
};

export type SyncAction = {
  type: string;
  payload?: any;
};

type AsyncAction = Function;

export type Action = SyncAction | AsyncAction;

export type Stream = {
  type: string;
  stream: Function;
};

export type Epic = {
  actions: string[];
  streams: Stream[];
};

export type Epics = Epic[];

export type Store = {
  store$: any;
  reducers: any;
  initialState: any;
};

export type StoreProps = {
  store$: any;
  reducers: Reducers | Function;
  initialState?: State;
};
