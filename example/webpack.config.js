var resolve = require('path').resolve
var webpack = require('webpack')
var projectRoot = resolve(__dirname, './')

module.exports = {
  entry: './src/entry.js',
  output: {
    path: resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  resolve: {
    extensions: [
      '.js', '.vue'
    ],
    alias: {
      "~example": resolve(projectRoot, 'src/')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.md$/,
        loader: resolve(__dirname, '../index.js')
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  }
}
