const path = require('path');
const globalRules = [
  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react']
      }
    }
  }
];
module.exports = [
  {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'index.js'
    },
    module: {
      rules: globalRules
    },
    mode: 'development'
  },
  {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'index.min.js'
    },
    module: {
      rules: globalRules
    },
    mode: 'production'
  },
  {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
      path: path.resolve(__dirname, './lib'),
      filename: 'index.js',
      library: 'node-package-open-source-starter',
      libraryTarget: 'umd',
    },
    module: {
      rules: globalRules
    },
    mode: 'production'
  }
];