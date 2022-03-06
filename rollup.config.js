import shebang from 'rollup-plugin-preserve-shebang';
import { terser } from 'rollup-plugin-terser';

const config = {
  input: 'index.js',
  output: {
    file: 'bundle.js',
    format: 'cjs',
  },

  plugins: [shebang({ shebang: '#!/usr/bin/env node' }), terser()],
};

export default config;
