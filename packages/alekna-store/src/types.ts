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
  actions$: any;
  reducers: any;
  initialState: any;
};

export type StoreProps = {
  actions$: any;
  reducers: Reducers | Function;
  initialState?: State | [];
};
