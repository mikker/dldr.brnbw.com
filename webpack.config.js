var path = require('path')
var webpack = require('webpack')

var currentEnv = process.env.NODE_ENV
var env = {
  test: currentEnv === 'test',
  development: currentEnv === 'development',
  production: currentEnv === 'production'
}

var index = './client/index'
var plugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    __DEV: env.development
  })
]
var loaders = ['babel']

if (env.production) {
  plugins.push(new webpack.optimize.UglifyJsPlugin())
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin())
  loaders.unshift('react-hot')
}

var config = {
  devtool: env.production ? 'sourcemaps' : 'eval-sourcemaps',
  entry: env.production ? index : [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    index
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: loaders, include: path.join(__dirname, 'client') },
      { test: /\.s?css?$/, loader: 'style!css!sass?includePaths[]=./node_modules!autoprefixer' }
    ]
  }
}

module.exports = config

