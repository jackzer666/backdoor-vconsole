import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const babel = (await import('@rollup/plugin-babel')).default;
const commonjs = (await import('@rollup/plugin-commonjs')).default;
const nodeResolve = (await import('@rollup/plugin-node-resolve')).default;
const terser = (await import('@rollup/plugin-terser')).default;

export default {
  input: "./index.js",
  output: [
    // CJS
    {
      file: "dist/index.cjs.js",
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
    {
      file: "dist/index.cjs.min.js",
      format: "cjs",
      exports: "named",
      plugins: [terser()],
    },
    // ESM
    {
      file: "dist/index.mjs",
      format: "es",
      sourcemap: true,
    },
    {
      file: "dist/index.min.mjs",
      format: "es",
      plugins: [terser()],
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    })
  ],
  external: ["vconsole"],
};
