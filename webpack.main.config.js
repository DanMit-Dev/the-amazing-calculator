
// webpack.main.config.js - compile Electron main to build/main.js
const path = require('path');

module.exports = {
  mode: 'production',
  target: 'electron-main',
  entry: './src/main.ts',
  output: { path: path.resolve(__dirname, 'build'), filename: 'main.js' },
  resolve: { extensions: ['.ts', '.js'] },
  module: { rules: [{ test: /\.ts$/, exclude: /node_modules/, use: 'ts-loader' }] }
};