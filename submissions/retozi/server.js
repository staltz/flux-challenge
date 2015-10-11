var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.config');
var express = require('express');
var proxy = require('proxy-middleware');
var url = require('url');

var app = express();

app.use('/dist', proxy(url.parse('http://localhost:8081/dist')));

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});



var webpackServer = new WebpackDevServer(webpack(config), {
    // webpack-dev-server options
    contentBase: __dirname,

    hot: false,
    // Enable special support for Hot Module Replacement
    // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
    // Use "webpack/hot/dev-server" as additional module in your entry point

    // webpack-dev-middleware options
    quiet: false,
    noInfo: false,
    publicPath: "https://localhost:8080/dist/",
    stats: {colors: true}
});

webpackServer.listen(8081, "localhost", function() {});
app.listen(8080);