const path = require('path');

module.exports = {
  entry: {
    bundle:"./src/index.ts",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    filename: '[name].js'
  },
  devServer: {
    static: {
      directory: './',
    },
    // 
  },
};
