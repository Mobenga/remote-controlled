const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.join(__dirname, "build"),
        filename: "bundle.js"
    },
    module: {
        preLoaders: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'eslint-loader'
            }
        ],
        loaders: [
            {
                test: /.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["es2015", "react"]
                }
            }
        ]
    },
    devtool: "source-map"
};
        

