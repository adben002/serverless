var webpack = require('webpack');
var MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {

  target: 'node',
  externals: [
    /aws-sdk/, // Available on AWS Lambda 
  ],
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new MinifyPlugin({}, {
        comments: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            [
              'env',
              {
                target: { node: 6.10 }, // Node version on AWS Lambda 
                useBuiltIns: true,
                modules: false,
                loose: true,
              },
            ]
          ],
        },
      },
    ],
  },
};
