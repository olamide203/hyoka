import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';

export default [{
  input: 'build/MathExpression.js',
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
  input: 'build/MathExpression.js',
  output: [{
    file: 'dist/esm/hyoka.js',
    format: 'esm',
    exports: 'default',
  },
  {
    file: 'dist/cjs/hyoka.js',
    format: 'cjs',
    exports: 'default',
  }],
  plugins: [nodeResolve()],
  external: ['decimal.js'],
},
{
  input: 'build/types/MathExpression.d.ts',
  output: {
    file: 'dist/types/index.d.ts',
    format: 'es',
  },
  plugins: [dts()],
}];
