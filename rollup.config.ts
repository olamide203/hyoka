import typescript from '@rollup/plugin-typescript';

export default [{
  input: 'src/Parser.ts',
  output: {
    file: 'dist/Parser.js',
    format: 'cjs',
    name: 'Parser',
    sourcemap: true,
  },
  plugins: [
    typescript(),
  ],
  external: ['decimal.js'],
}];
