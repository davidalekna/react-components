export type Reducers = {
  [key: string]: Function;
};

export type State = {
  [key: string]: any;
};

export type Action = {
  type: string;
  payload?: any;
};

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
  reducers: any;
  initialState: any;
  epics: any;
};
