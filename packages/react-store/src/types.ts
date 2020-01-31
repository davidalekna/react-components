export type ReducerFunction = <T>(state: T, action?: Action) => T;

export type Reducers = {
  // [key: string]: ReducerFunction;
  [key: string]: Function;
};

export type StoreState<T> = {
  selectState: Function;
  stateChanges: Function;
  dispatch: (args: Action) => void;
  initialState: T;
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
