
const path = require('path');

module.exports = [
  // renderer bundle (bundles mathjs + renderer into dist/renderer.js)
  {
    entry: './src/renderer.ts',
    target: 'electron-renderer',
    module: {
      rules: [{ test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ }]
    },
    resolve: { extensions: ['.ts', '.js'] },
    output: {
      filename: 'renderer.js',
      path: path.resolve(__dirname, 'dist')
    },
    mode: 'production'
  },
  // main process compile (TS -> dist/main.js)
  {
    entry: './src/main.ts',
    target: 'electron-main',
    module: {
      rules: [{ test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ }]
    },
    resolve: { extensions: ['.ts', '.js'] },
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist')
    },
    node: { __dirname: false, __filename: false },
    mode: 'production'
  }
];
