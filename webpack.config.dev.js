const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//var ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpackMajorVersion = require("webpack/package.json").version.split(".")[0];

module.exports = {
    context: __dirname,
    entry: {
        index: "./src/js/index.tsx",
        style: "./src/js/style.js",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    devtool: "source-map",
    output: {
        path: path.join(__dirname, "dist/webpack-" + webpackMajorVersion),
        publicPath: "",
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle_[chunkhash].js",
        // sourceMapFilename: "[file].map"
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                include: path.join(__dirname, "src/css"),
                loaders: ["style-loader", "css-loader"],
            },
            {
                test: /\.tsx?$/,
                loader : "ts-loader",
                // exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {}
                    }
                ]
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                    options: {
                        interpolate: true
                    }
                }
            }
        ]
    },
    devServer: {
        contentBase: [
            path.resolve(__dirname, "dist"),
            path.resolve(__dirname, "node_modules"),
            path.resolve(__dirname, "src"),
            path.resolve(__dirname, "src/js"),
            path.resolve(__dirname, "src/css"),
        ],
        "disableHostCheck": true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            chunks: ["index", "style"]
        }),
        new HtmlWebpackPlugin({
            filename: "test.html",
            template: "./src/test.html",
            chunks: ["index", "style"]
        }),
        new webpack.ProvidePlugin({
            "React": "react",
        }),
    ],
    mode: "development",
};
