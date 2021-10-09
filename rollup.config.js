import path from 'path';
import pkg from './package.json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typeScript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import postcssPresetEnv from 'postcss-preset-env';
import del from 'rollup-plugin-delete';
import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import visualizer from 'rollup-plugin-visualizer';

const isProd = !process.env.ROLLUP_WATCH;

const EXTENSIONS = ['.ts', '.tsx'];

const config = {
  input: pkg.source,
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'esm' },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typeScript({ tsconfig: 'tsconfig.json' }),
    babel({
      extensions: EXTENSIONS,
      include: EXTENSIONS.map((ext) => `src/**/*${ext}`),
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    postcss({
      extract: path.resolve('dist/antodoui.css'),
      plugins: [
        postcssImport(),
        postcssNested(),
        postcssPresetEnv(),
      ],
      minimize: isProd,
    }),
  ],
  external: Object.keys(pkg.peerDependencies || {}),
};

if (isProd) {
  config.plugins.push(
    del({ targets: ['dist/*'] }),
    terser(),
    sizeSnapshot(),
    visualizer(),
  );
}

export default config;
