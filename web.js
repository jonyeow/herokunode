// web.js
var express = require("express");
var routes = require('./routes');
var logfmt = require("logfmt");
var http = require('http');
var path = require('path');

var monk = require('monk');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(app.router);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser('your secret here'));
app.use(express.methodOverride());
app.use(express.session());
app.use(logfmt.requestLogger());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});