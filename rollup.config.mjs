import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const typescript = (await import('@rollup/plugin-typescript')).default;
const terser = (await import('@rollup/plugin-terser')).default;

export default {
  input: "./src/index.ts",
  output: [
    // CJS
    {
      file: "dist/index.cjs.js",
      format: "cjs",
      exports: "named",
      sourcemap: false,
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
      sourcemap: false,
    },
    {
      file: "dist/index.min.mjs",
      format: "es",
      plugins: [terser()],
    },
  ],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "./dist",
      noEmit: false,
    }),
  ],
  external: ["vconsole"],
};
