import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['index.tsx'],
  bundle: true,
  outfile: 'dist/index.js',
  platform: 'browser',
  format: 'esm',
  jsx: 'automatic',
  minify: true,
  sourcemap: true,
  external: ['react-dom', "react-router-dom"],
});