module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  entry: [
    './index.js'
  ],
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: 'handstand-snapshot.min.js'
  },
  devServer: {
    contentBase: './build'
  }
};