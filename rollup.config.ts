import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';

export default [{
  input: 'build/Expression.js',
  output: {
    file: 'dist/umd/hyoka.js',
    format: 'umd',
    name: 'MathExpression',
    esModule: false,
  },
  plugins: [
    terser(),
    nodeResolve(),
  ],
}, {
  input: 'build/Expression.js',
  output: [{
    file: 'dist/esm/hyoka.mjs',
    format: 'esm',
  },
  {
    file: 'dist/cjs/hyoka.js',
    format: 'cjs',
  }],
  plugins: [nodeResolve()],
  external: ['decimal.js'],
},
{
  input: 'build/types/Expression.d.ts',
  output: {
    file: 'dist/types/index.d.ts',
    format: 'es',
  },
  plugins: [dts()],
}];
