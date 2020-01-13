import { Subject, BehaviorSubject } from 'rxjs';

export type ReducerFunction = <T>(state?: T, action?: Action) => T;

export type Reducers = {
  // [key: string]: ReducerFunction;
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
  _stateUpdates: Subject<Action>;
  store$: BehaviorSubject<any>;
  reducers: Reducers | Function;
  initialState: T;
};

export type StoreProps = {
  _stateUpdates: any;
  reducers: Reducers | Function;
  initialState?: State | [];
};
