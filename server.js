// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

//-------------------------------------------------------------//

// init Spotify API wrapper
var SpotifyWebApi = require("spotify-web-api-node");

// Replace with your redirect URI, required scopes, and show_dialog preference
var redirectUri = `https://${process.env.PROJECT_DOMAIN}.glitch.me/callback`;
var scopes = ["user-top-read"];
var showDialog = true;

// The API object we'll use to interact with the API
var spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: redirectUri
});

app.get("/authorize", function(request, response) {
  var authorizeURL = spotifyApi.createAuthorizeURL(scopes, null, showDialog);
  console.log(authorizeURL);
  response.send(authorizeURL);
});

// Exchange Authorization Code for an Access Token
app.get("/callback", function(request, response) {
  var authorizationCode = request.query.code;

  spotifyApi.authorizationCodeGrant(authorizationCode).then(
    function(data) {
      console.log(data);
      response.redirect(
        `/#access_token=${data.body["access_token"]}&refresh_token=${
          data.body["refresh_token"]
        }`
      );
    },
    function(err) {
      console.log(
        "Something went wrong when retrieving the access token!",
        err.message
      );
    }
  );
});

app.get("/logout", function(request, response) {
  response.redirect("/");
});

app.get("/myendpoint", function(request, response) {
  var loggedInSpotifyApi = new SpotifyWebApi();
  // console.log("enpoint");
  // console.log("request");
  console.log(request.headers["authorization"].split(" ")[1]);
  loggedInSpotifyApi.setAccessToken(
    request.headers["authorization"].split(" ")[1]
  );

  // Search for a track!
  loggedInSpotifyApi.getMyTopTracks().then(
    //where is the second )??
    function(data) {
      console.log(data.body);
      response.send(data.body);
    },
    function(err) {
      console.error(err);
    }
  );
});

//attempting to get the audio features of a track; loop thru each song in toptracks, run this get audio features?
//then add to the list of objects?
app.get("/features", function(request, response) {
  console.log("server");
  // console.log(request);
  console.log(request.query.id);

  var loggedInSpotifyApi = new SpotifyWebApi();
  // console.log("enpoint");
  // console.log("request");
  console.log(request.headers["authorization"].split(" ")[1]);
  loggedInSpotifyApi.setAccessToken(
    request.headers["authorization"].split(" ")[1]
  );

  loggedInSpotifyApi
    .getAudioFeaturesForTrack(request.query.id)
    //need to get comma separated list of spotify ids for tracks, max 100
    .then(
      function(data) {
        // console.log("server request");
        console.log(data.body);
        response.send(data.body);
      },
      function(err) {
        console.log("server request");
        console.log(err);
      }
    );
});
//-------------------------------------------------------------//

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
