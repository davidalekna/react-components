import { Subject } from 'rxjs';

export type Reducers = {
  // [key: string]: <T>(state: T, action: Action) => T;
  [key: string]: Function;
};

export type State = {
  [key: string]: any;
  dispatch: (args: Action) => void;
};

export type SyncAction = Partial<{
  type: string;
  payload: any;
}>;

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

export type Store<T> = {
  actions$: Subject<Action>;
  reducers: Reducers | Function;
  initialState: T;
};

export type StoreProps = {
  actions$: any;
  reducers: Reducers | Function;
  initialState?: State | [];
};
