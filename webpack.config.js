
var webpack = require("webpack");
var path = require("path");

module.exports = {
    entry: "./src/app.js",

    output: {
        path: "./example",
        filename: "bundle.js"
    },
    devServer:{
        contentBase: "example/",
        noInfo: true,
        hot: true,
        inline: true
    },
    module: {
        loaders: [
            { test: /\.js/, exclude: /node_modules/, loaders: ['babel-loader']},
            { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
            { test: /\.html$/, loader: 'file?name=[name].[ext]' }
        ]
    }
};
