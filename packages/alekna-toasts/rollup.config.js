import { rollup } from '../../config/rollup.config';

export default rollup({
  name: 'alekna-toasts',
  extraGlobals: {
    react: 'react',
  },
});
