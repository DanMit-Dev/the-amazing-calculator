// webpack.renderer.config.js - compile renderer TS and CSS to build/renderer.js
const path = require('path');

module.exports = {
  mode: 'production',
  target: 'electron-renderer',
  entry: './src/renderer.ts',
  output: { path: path.resolve(__dirname, 'build'), filename: 'renderer.js' },
  resolve: { extensions: ['.ts', '.js'] },
  module: {
    rules: [
      { test: /\.ts$/, exclude: /node_modules/, use: 'ts-loader' },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] }
    ]
  }
};