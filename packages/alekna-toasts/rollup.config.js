import { rollup } from '../../config/rollup.config';

export default rollup({
  name: 'alekna-toasts',
  extraGlobals: {
    react: 'react',
    'react-dom': 'react-dom',
    'prop-types': 'prop-types',
    'styled-components': 'styled-components',
  },
});
