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

// Allow to parse the body of the POST requests
app.use(express.bodyParser());

app.get('/', routes.index);


// GET /callback
//   If param hub.callenge is present, renders its value
//   This URL is used by suscription system of Instagram
//   to check if the callback URL provided when creating the suscription
//   is valid and works fine
app.get('/callback', function(request, response){
  if(request.param("hub.challenge") != null){
    response.send(request.param("hub.challenge"));
  } else {
    console.log("ERROR on suscription request: %s", util.inspect(request));
  }
});


// POST /callback
//   Receives POST nofications with the geometries updated
//   Each notification contains a geography_id, which is
//   the identifier of the geography that has a new photo.
//   It's necessary to perform another API call to get the last
//   photo from that geography
app.post('/callback', function(request, response){
  // request.body is a JSON already parsed
  request.body.forEach(function(notificationOjb){
    // Every notification object contains the id of the geography
    // that has been updated, and the photo can be obtained from
    // that geography
    https.get({
      host: 'api.instagram.com',
      path: '/v1/geographies/' + notificationOjb.object_id + '/media/recent' +
      '?' + querystring.stringify({client_id: '7c7762e8edbd461d85365b7eeb9a16b1',count: 1}),
    }, function(res){
      var raw = "";

      res.on('data', function(chunk) {
        raw += chunk;
      });

      // When the whole body has arrived, it has to be a valid JSON, with data,
      // and the first photo of the date must to have a location attribute.
      // If so, the photo is emitted through the websocket
      res.on('end', function() {
        var response = JSON.parse(raw);
        if(response['data'].length > 0 && response['data'][0]['location'] != null) {
          io.sockets.emit('photo', raw);
        } else {
          console.log("ERROR: %s", util.inspect(response['meta']));
        }
      });

    });
  });

  response.writeHead(200);
});




var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});