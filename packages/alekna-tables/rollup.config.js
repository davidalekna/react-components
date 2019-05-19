import { rollup } from '../../config/rollup.config';

export default rollup({
  name: 'alekna-tables',
  input: './src/index.ts',
  extraGlobals: {
    react: 'react',
  },
});
