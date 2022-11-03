const path = require('path');

module.exports = {
  entry: {
    bundle:"./src/main.ts",
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
  mode: 'development',
  devServer: {
    static: {
      directory: './',
    },
    // 
  },
};
