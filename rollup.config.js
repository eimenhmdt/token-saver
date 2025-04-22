import terser from '@rollup/plugin-terser';

export default {
  input: 'src/token-saver.js',
  output: [
    { file: 'dist/token-saver.mjs', format: 'es', sourcemap: true },
    { file: 'dist/token-saver.cjs', format: 'cjs', exports: 'default', sourcemap: true }
  ],
  plugins: [terser()]
};