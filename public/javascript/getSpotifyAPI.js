// var spotifyData = [];
// //creating boolean flag
// let flag = false;

// const hash = window.location.hash
//   .substring(1)
//   .split("&")
//   .reduce(function(initial, item) {
//     if (item) {
//       var parts = item.split("=");
//       initial[parts[0]] = decodeURIComponent(parts[1]);
//     }
//     return initial;
//   }, {});
// window.location.hash = "";

// //attributes: https://developer.spotify.com/documentation/web-api/reference/tracks/get-track/


// if (hash.access_token) {
//   // window.location = "https://penn-2020.glitch.me/my-page.html";

//   $.get(
//     {
//       url: "/myendpoint",
//       headers: { Authorization: `Bearer ${hash.access_token}` }
//     },
//     function(data) {
//       data.items.forEach(function(track) {
//         console.log(track); 
//         spotifyData.push(track);
//       });
//     }
//   );
//   flag = true;
// }
