import { merge } from 'rxjs';
import { Epics, Epic, Stream, Action } from './types';
import { ofType } from './index';
import { filter } from 'rxjs/operators';

// ERROR: combine epics does not work at the moment.

export default function combineEpics(epics: Epics): any {
  // extract available actions and actions that have streams
  const allActions = epics.reduce(
    (acc: string[], epic: Epic) => [...acc, ...epic.actions],
    [],
  );
  const usedActions = epics.reduce((acc: string[], epic: Epic) => {
    return [...acc, ...epic.streams.map(s => s.type)];
  }, []);
  const unusedActions = allActions
    .map(a => (!usedActions.includes(a) ? a : null))
    .filter(Boolean);
  const declaredStreams = epics.reduce((acc: Stream[], val: Epic) => {
    return [...acc, ...val.streams];
  }, []);

  return (stream$: any) => {
    return merge(
      // unstreamed actions
      stream$.pipe(filter(({ type }: Action) => unusedActions.includes(type))),
      // streamed actions
      ...declaredStreams.map(({ type, stream }) => {
        return stream(stream$.pipe(ofType(type)));
      }),
    );
  };
}
