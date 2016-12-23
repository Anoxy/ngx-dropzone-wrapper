var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    'angular2-dropzone-wrapper.umd': './src/index.ts',
    'angular2-dropzone-wrapper.umd.min': './src/index.ts'
  },
  output: {
    path: './bundles',
    filename: '[name].js',
    library: 'angular2-dropzone-wrapper',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'strip-sourcemap-loader'
        ]
      },
      {
        test: /\.ts$/,
        loaders: [
          'string-replace-loader?search=component\.css&replace=component\.scss',
          'awesome-typescript-loader?tsconfig=src/tsconfig.json&declaration=false',
          'angular2-template-loader'
        ]
      },
      {
        test: /\.scss$/,
        loaders: ["raw-loader", "sass-loader"]
      },
      {
        test: /\.(html|css)$/,
        loader: 'raw-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts'],
    modules: [ '../src', path.join(__dirname, "../node_modules") ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ],
  externals: [
    "@angular/common",
    "@angular/compiler",
    "@angular/core",
    "@angular/forms",
    "@angular/http",
    "rxjs/Rx"
  ]
};
