var pkg = require('./package.json');
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ],
  },
  entry: ['./index.js'],
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'handstand-v' + pkg.version + '.min.js',
  },
  devServer: {
    contentBase: './dist',
  },
};
