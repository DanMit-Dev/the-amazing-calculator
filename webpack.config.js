const path = require('path');

module.exports = {
  entry: './src/renderer.ts',
  target: 'electron-renderer',
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ }
    ]
  },
  resolve: { extensions: ['.ts', '.js'] },
  output: {
    filename: 'renderer.js',
    path: path.resolve(__dirname, 'dist')
  }
};
