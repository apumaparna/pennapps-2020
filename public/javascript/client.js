// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  $("#login").click(function() {
    // Call the authorize endpoint, which will return an authorize URL, then redirect to that URL
    $.get("/authorize", function(data) {
      console.log(data);
      window.location = data;
    });
  });
});

var spotifyData = [];
var featureData = []; 

//creating boolean flag
let flag = false;

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";

//attributes: https://developer.spotify.com/documentation/web-api/reference/tracks/get-track/

if (hash.access_token) {
  // window.location = "https://penn-2020.glitch.me/my-page.html";

  $.get(
    {
      url: "/myendpoint",
      headers: { Authorization: `Bearer ${hash.access_token}` }
    },
    function(data) {
      data.items.forEach(function(track) {
        // console.log(track);
        
        console.log("id")
        let id = track.id;
        console.log(id); 
        
        console.log(`Bearer ${hash.access_token}`)
        
        getFeatures(id); 

        spotifyData.push(track);
      });
    }
  );
  flag = true;
}

//tryign to add a get features based on ID
function getFeatures(id) {
  //resetCanvas();
  
  console.log("getFeatures called")
  let query = "/features?id=" + id;
  
  console.log(query); 
  
  $.get({
      url: query,
      headers: { Authorization: `Bearer ${hash.access_token}` }
    }, function(data) {
    
    featureData.push(data); 

  });
}
