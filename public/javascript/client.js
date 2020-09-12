// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  
  $('#login').click(function() {
    // Call the authorize endpoint, which will return an authorize URL, then redirect to that URL
    $.get('/authorize', function(data) {
      console.log(data)
      window.location = data;
    });
  });
  
  const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function (initial, item) {
      if (item) {
        var parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
    window.location.hash = '';
  
  //attributes: https://developer.spotify.com/documentation/web-api/reference/tracks/get-track/
  
  if (hash.access_token) {
    // window.location = "https://penn-2020.glitch.me/my-page.html"; 
    
    $.get({url: '/myendpoint', headers: {"Authorization": `Bearer ${hash.access_token}`}}, function(data) {
      // "Data" is the array of track objects we get from the API. See server.js for the function that returns it.
      
      //window.location.href = "/my-page.html"
      console.log(data)
      
      var title = $('<h3>Your top tracks on Spotify:</h3>');
      title.prependTo('#data-container');

      // For each of the tracks, create an element
      data.items.forEach(function(track) {
        var trackDiv = $('<li class="track"></li>');
        trackDiv.text(`Name: ${track.name} , Popularity: ${track.popularity}, ID: ${track.id}`);
        trackDiv.appendTo('#data-container ol');
      });

    });
  }

});
