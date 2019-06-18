import { rollup } from '../../config/rollup.config';

export default rollup({
  name: 'alekna-forms',
  extraGlobals: {
    lodash: 'lodash',
    react: 'react',
  },
});
