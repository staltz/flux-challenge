var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');

var express = require("express"),
    app = express();
var port = 3001;

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use("/styles", express.static(__dirname + '/../..'));

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> Listening on port %s", port, port);
  }
});
