import { merge } from 'rxjs';

export default function combineEpics(epics: any[]): any {
  return (...actions$) =>
    merge(
      ...epics.map(epic => {
        const output$ = epic(...actions$);
        if (!output$) {
          throw new TypeError(
            `combineEpics: one of the provided Epics "${epic.name ||
              '<anonymous>'}" does not return a stream. Double check you\'re not missing a return statement!`,
          );
        }
        return output$;
      }),
    );
}
