var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpackMajorVersion = require("webpack/package.json").version.split(".")[0];

module.exports = {
  context: __dirname,
  entry: {
    index: "./src/js/index.ts",
    style: "./src/js/style.js",
  },
  resolve: {
    extensions: [".js", ".ts"]
  },

  output: {
    path: path.join(__dirname, "dist/webpack-" + webpackMajorVersion),
    publicPath: "",
    filename: "[name].bundle.js",
    chunkFilename: "[id].bundle_[chunkhash].js",
    sourceMapFilename: "[file].map"
  },
  module: {
    rules: [
      { test: /\.css$/, loaders: ["style-loader", "css-loader"] },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
    ]
  },
  plugins: [],
  mode: "production"
};
