import { configure } from '@storybook/react';

const req = require.context(
  '../stories',
  true,
  /.*\.(stories|story)\.(js|ts|tsx)?$/,
);

const loadStories = () => {
  req.keys().forEach(filename => req(filename));
};

configure(loadStories, module);
