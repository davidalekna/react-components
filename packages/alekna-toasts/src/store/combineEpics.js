const combineEpics = (...epics) => {
  return (...streams) => {
    return merge(
      streams[0],
      ...epics.map(epic => {
        const output$ = epic(...streams);
        if (!output$) {
          throw new TypeError(
            `combineEpics: one of the provided Epics "${epic.name ||
              '<anonymous>'}" does not return a stream. Double check you\'re not missing a return statement!`,
          );
        }
        return output$;
      }),
    );
  };
};

export default combineEpics;
