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
const globalMode = 'development';
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
    mode: globalMode
  },
];