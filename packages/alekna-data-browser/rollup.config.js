import { rollup } from '../../config/rollup.config';

export default rollup({
  name: 'alekna-data-browser',
  input: './src/index.ts',
  extraGlobals: {
    react: 'react',
  },
});
