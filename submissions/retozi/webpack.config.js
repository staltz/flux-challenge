var path = require('path');
var webpack = require("webpack");

module.exports = {
    entry: ['./main.ts'],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "main.js",
        publicPath: '/dist'
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devtool: "sourcemap",
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: ["", ".js", '.ts', '.tsx']
    }
};